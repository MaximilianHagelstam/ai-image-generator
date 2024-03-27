import { BlobServiceClient } from '@azure/storage-blob';
import { customAlphabet } from 'nanoid';

const connectionString = process.env.AZURE_CONNECTION_STRING || '';
const containerName = process.env.AZURE_CONTAINER_NAME || '';

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

export const uploadImage = async (imageUrl: string): Promise<string | null> => {
  try {
    const id = customAlphabet(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      7,
    )();

    const res = await fetch(imageUrl);
    const file = await res.arrayBuffer();

    const blobName = `image_${id}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file);

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image: ', error);
    return null;
  }
};
