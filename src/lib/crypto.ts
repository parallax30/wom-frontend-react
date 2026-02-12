const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function getKey() {
  const rawKey = encoder.encode(
    process.env.NEXT_PUBLIC_AUTH_SECRET!
  );

  const hash = await crypto.subtle.digest('SHA-256', rawKey);

  return crypto.subtle.importKey(
    'raw',
    hash,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptPayload(payload: object) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encoder.encode(JSON.stringify(payload))
  );

  return {
    iv: Buffer.from(iv).toString('base64'),
    data: Buffer.from(encrypted).toString('base64'),
  };
}

export async function decryptPayload(payload: { iv: string; data: string }) {
  const key = await getKey();

  const iv = Uint8Array.from(Buffer.from(payload.iv, 'base64'));
  const encrypted = Uint8Array.from(Buffer.from(payload.data, 'base64'));

  try {
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encrypted
    );

    const text = decoder.decode(new Uint8Array(decrypted));
    return JSON.parse(text) as object;
  } catch (e) {
    console.error('[crypto] decrypt error', e);
    throw e;
  }
}




