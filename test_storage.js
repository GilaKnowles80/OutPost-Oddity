const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: 'us-east-2',
  endpoint: 'https://br-empty-dew-be5kdytu.storage.c-9.us-east-2.aws.neon.tech',
  credentials: {
    accessKeyId: 'nak_live_6f0eda343d044a7191f1672acdd8c2e7',
    secretAccessKey: 'nsk_live_58229da1f567329797461863728e70e62aeab04b788c099cd43ca135822f223a'
  },
  // Use path style S3 addressing and disable SSL verification
  forcePathStyle: true,
  httpOptions: {
    agent: new (require('https').Agent)({ rejectUnauthorized: false })
  }
});

const bucket = 'uploads';
const key = 'test-file.txt';
const fileContent = 'Hello OutPost Oddity - Neon Object Storage Test';

async function testObjectStorage() {
  // 1. Upload file
  console.log('1. Uploading file to bucket:', bucket);
  const putCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: fileContent
  });
  await s3.send(putCommand);
  console.log('   File uploaded successfully');

  // 2. List bucket objects
  console.log('2. Listing bucket objects:');
  const listCommand = new ListObjectsV2Command({ Bucket: bucket });
  const listResult = await s3.send(listCommand);
  if (listResult.Contents && listResult.Contents.length > 0) {
    listResult.Contents.forEach(obj => {
      console.log('   -', obj.Key, '(' + obj.Size + ' bytes)');
    });
  } else {
    console.log('   (no objects found)');
  }

  // 3. Read file back
  console.log('3. Reading file back:');
  const getCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  });
  const getResult = await s3.send(getCommand);
  const content = await new Promise((resolve) => {
    const chunks = [];
    getResult.Body.on('data', chunk => chunks.push(chunk));
    getResult.Body.on('end', () => resolve(Buffer.concat(chunks).toString()));
  });
  console.log('   File content:', content);

  console.log('\nObject storage test completed successfully!');
}

testObjectStorage().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});