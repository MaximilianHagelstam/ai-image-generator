import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_CONNECTION_STRING || '';
const containerName = process.env.AZURE_CONTAINER_NAME || '';

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerClient = blobServiceClient.getContainerClient(containerName);

export const getImageUrls = async (): Promise<string[]> => {
  const urls: string[] = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
    urls.push(tempBlockBlobClient.url);
  }
  return urls;
};
