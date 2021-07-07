import { Webhooks } from '@mux/mux-node';

// const webhookSecret = import.meta.env.VITE_MUX_WEBHOOK_SECRET;
const webhookSecret = 'abc123';

export async function post(request) {
  const signature = request.headers['mux-signature'];

  const isValidSignature = Webhooks.verifyHeader(
    JSON.stringify(request.body),
    signature,
    webhookSecret
  );

  try {
    if (!isValidSignature) { throw new Error('Invalid signature') };

    if (request.body.type === 'video.asset.ready') {
      console.log('video.asset.ready')
    };
  } catch(e) {
    console.log(e)
  } finally {
    return {
      body: {
        received: true
      }
    }
  }
}
