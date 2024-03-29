import { BlobServiceClient } from '@azure/storage-blob';
import { customAlphabet } from 'nanoid';
import {
  AzureConnectionString,
  AzureContainerName,
  ExampleImage,
  IsProd,
} from '~/utils/constants';

export const uploadImage = async (imageUrl: string): Promise<string | null> => {
  if (IsProd) return ExampleImage;
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AzureConnectionString,
  );
  const containerClient =
    blobServiceClient.getContainerClient(AzureContainerName);

  try {
    const id = customAlphabet(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      7,
    )();

    const res = await fetch(imageUrl);
    const file = await res.arrayBuffer();

    const blobName = `image_${id}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file, {
      blobHTTPHeaders: {
        blobContentType: 'image/png',
      },
    });

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image: ', error);
    return null;
  }
};
