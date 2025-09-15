// -- config --



// -- run --
import Fastify from "fastify";
import { verifyKey } from "discord-interactions";

// Register raw body plugin so we can verify Discord's signature
const app = Fastify({ logger: true });
await app.register(import("fastify-raw-body"), {
  field: "rawBody",
  global: true,
});

// Load required environment variables
import dotenv from "dotenv"
dotenv.config();
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!; // For verifying requests
const INTERNAL_PORT = process.env.INTERNAL_PORT!; // Local port
const FORWARD_URL = process.env.FORWARD_URL!;// URL to redirect


// interaction for browser
app.get("/", async () => {
  return { status: "ok", message: "Bot API is running" };
});


// interaction for dicord
app.post("/", async (request, reply) => {
  
  // * verify...
  
  const signature = request.headers["x-signature-ed25519"] as string;
  const timestamp = request.headers["x-signature-timestamp"] as string;
  const rawBody = (request.rawBody || "") as string;

  // Verify request signature
  const isValid = await verifyKey(rawBody, signature, timestamp, DISCORD_PUBLIC_KEY);
  console.log(`Incoming request: validation... ${isValid}`);
  if (!isValid) {
    console.warn(`Incoming request: wrong`);
    return reply.status(401).send({ error: "Invalid request signature" });
  }

  // Parse the interaction payload
  const body = JSON.parse(rawBody);

  // Respond to ping
  if (body.type === 1) {
    console.log(`Incoming request: pong!`);
    return reply.send({ type: 1 });
  }

  // * and now its fine !
  
  // Forward to Gadget backend
  console.log(`Incoming request: forward`);
  const gadgetRes = await fetch(FORWARD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: rawBody,
  });

  const gadgetJson = await gadgetRes.json();
  reply.send(gadgetJson);

});

// Start the Fastify server
app.listen({ port: parseInt(INTERNAL_PORT) }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Server running at ${address}`);
});