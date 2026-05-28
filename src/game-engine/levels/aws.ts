import { LevelDefinition } from "../types";

export const awsLevels: LevelDefinition[] = [
  {
    id: "aws-1",
    courseId: "aws",
    number: 1,
    title: "AWS Core Concepts",
    description: "AWS is the world's largest cloud platform. Learn regions, AZs, IAM, and the shared responsibility model.",
    concept: "AWS Fundamentals",
    conceptExplanation:
      "Amazon Web Services (AWS) offers 200+ cloud services.\n\nKey concepts:\n• Region — geographic area with multiple data centers (us-east-1, eu-west-1)\n• Availability Zone (AZ) — isolated data center within a region\n• IAM — Identity and Access Management (who can do what)\n• Shared Responsibility — AWS manages the cloud; you manage what's IN the cloud\n\nGlobal infrastructure:\n• 33+ regions worldwide\n• 105+ AZs\n• 600+ CloudFront edge locations\n\nCore services every developer needs:\n• EC2 — virtual machines\n• S3 — object storage\n• RDS — managed databases\n• Lambda — serverless functions\n• CloudFront — CDN\n• Route 53 — DNS\n• VPC — virtual private network",
    codeExample: `# AWS CLI setup
aws configure
# AWS Access Key ID: AKIA...
# AWS Secret Access Key: ...
# Default region name: us-east-1
# Default output format: json

# Check identity
aws sts get-caller-identity

# List regions
aws ec2 describe-regions --output table

# AWS SDK (Node.js)
import { S3Client } from '@aws-sdk/client-s3';
const s3 = new S3Client({ region: 'us-east-1' });`,
    starterCode: `// AWS: global cloud platform
const awsServices = [
  { service: "IAM",    dir: "right" },
  { service: "EC2",    dir: "right" },
  { service: "S3",     dir: "right" },
  { service: "RDS",    dir: "down" },
  { service: "Lambda", dir: "right" },
];

for (const svc of awsServices) {
  hero.move(svc.dir);
}
hero.move("right");
hero.move("down");`,
    solutionCode: `const awsServices = [
  { service: "IAM",    dir: "right" },
  { service: "EC2",    dir: "right" },
  { service: "S3",     dir: "right" },
  { service: "RDS",    dir: "down" },
  { service: "Lambda", dir: "right" },
];

for (const svc of awsServices) {
  hero.move(svc.dir);
}
hero.move("right");
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), right, down, down to exit.",
    tip: "Always deploy to at least 2 AZs — this protects against single data center failures.",
  },

  {
    id: "aws-2",
    courseId: "aws",
    number: 2,
    title: "IAM — Identity & Access Management",
    description: "IAM controls who can access which AWS resources and what actions they can perform.",
    concept: "IAM Users, Roles & Policies",
    conceptExplanation:
      "IAM is the security backbone of AWS.\n\nCore concepts:\n• Root account — full access, protect with MFA, never use day-to-day\n• IAM User — a person or application with long-term credentials\n• IAM Role — temporary credentials, assumed by services or users\n• IAM Policy — JSON document defining permissions\n• IAM Group — collection of users with shared permissions\n\nPolicy structure:\n{\n  \"Effect\": \"Allow\",\n  \"Action\": [\"s3:GetObject\", \"s3:PutObject\"],\n  \"Resource\": \"arn:aws:s3:::my-bucket/*\"\n}\n\nBest practices:\n• Principle of least privilege\n• Enable MFA for all users\n• Use roles instead of users for EC2/Lambda\n• Rotate access keys regularly\n• Never commit AWS keys to git",
    codeExample: `# Create IAM user
aws iam create-user --user-name alice

# Attach policy
aws iam attach-user-policy \\
  --user-name alice \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

# Create role for EC2 to access S3
aws iam create-role --role-name EC2S3Role \\
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "ec2.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# Check permissions
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::123:user/alice \\
  --action-names s3:GetObject`,
    starterCode: `// IAM: who can do what on which resource
const iamSetup = [
  { step: "create user alice", dir: "right" },
  { step: "attach S3 policy",  dir: "right" },
  { step: "create EC2 role",   dir: "down" },
  { step: "attach role policy",dir: "right" },
  { step: "enable MFA",        dir: "right" },
];

for (const s of iamSetup) {
  hero.move(s.dir);
}
hero.move("down");`,
    solutionCode: `const iamSetup = [
  { step: "create user alice", dir: "right" },
  { step: "attach S3 policy",  dir: "right" },
  { step: "create EC2 role",   dir: "down" },
  { step: "attach role policy",dir: "right" },
  { step: "enable MFA",        dir: "right" },
];

for (const s of iamSetup) {
  hero.move(s.dir);
}
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Use IAM roles for EC2 and Lambda instead of embedding access keys — roles rotate credentials automatically.",
  },

  {
    id: "aws-3",
    courseId: "aws",
    number: 3,
    title: "S3 — Simple Storage Service",
    description: "S3 stores any amount of data as objects in buckets — scalable, durable, cheap.",
    concept: "S3 Object Storage",
    conceptExplanation:
      "S3 (Simple Storage Service) is AWS's object store — 99.999999999% (11 nines) durability.\n\nCore concepts:\n• Bucket — container for objects (globally unique name)\n• Object — file + metadata, up to 5TB\n• Key — the object's path within the bucket\n• Versioning — keep multiple versions of objects\n• Lifecycle policies — auto-delete or move to cheaper storage\n\nAccess control:\n• Bucket policy (resource-based)\n• IAM policy (identity-based)\n• Block Public Access (default ON — keep it ON!)\n• Pre-signed URLs — temporary access to private objects\n\nStorage classes (cost tiers):\n• S3 Standard — frequent access\n• S3 Infrequent Access — less frequent\n• S3 Glacier — archival (minutes-hours retrieval)\n\nCommon uses: static websites, images, backups, logs, datasets",
    codeExample: `import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: 'us-east-1' });

// Upload a file
await s3.send(new PutObjectCommand({
  Bucket: 'my-app-uploads',
  Key: \`images/\${userId}/avatar.jpg\`,
  Body: fileBuffer,
  ContentType: 'image/jpeg',
  ServerSideEncryption: 'AES256',
}));

// Generate pre-signed URL (1 hour)
const url = await getSignedUrl(s3, new GetObjectCommand({
  Bucket: 'my-app-uploads',
  Key: 'images/alice/avatar.jpg',
}), { expiresIn: 3600 });

// CLI
aws s3 cp file.txt s3://my-bucket/
aws s3 sync ./dist s3://my-website/
aws s3 ls s3://my-bucket/`,
    starterCode: `// S3: store and retrieve objects
function s3Operations(objects) {
  for (const obj of objects) {
    hero.move(obj.dir);
  }
}

s3Operations([
  { op: "PutObject image",     dir: "right" },
  { op: "PutObject video",     dir: "right" },
  { op: "GetObject",           dir: "right" },
  { op: "presigned URL",       dir: "down" },
  { op: "lifecycle rule",      dir: "right" },
  { op: "enable versioning",   dir: "right" },
]);
hero.move("down");`,
    solutionCode: `function s3Operations(objects) {
  for (const obj of objects) {
    hero.move(obj.dir);
  }
}

s3Operations([
  { op: "PutObject image",   dir: "right" },
  { op: "PutObject video",   dir: "right" },
  { op: "GetObject",         dir: "right" },
  { op: "presigned URL",     dir: "down" },
  { op: "lifecycle rule",    dir: "right" },
  { op: "enable versioning", dir: "right" },
]);
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Enable versioning and Block Public Access on all S3 buckets by default. Use pre-signed URLs for private file access.",
  },

  {
    id: "aws-4",
    courseId: "aws",
    number: 4,
    title: "EC2 — Elastic Compute Cloud",
    description: "EC2 provides resizable virtual machines. Launch, configure, and scale servers in minutes.",
    concept: "EC2 Instances",
    conceptExplanation:
      "EC2 lets you run virtual machines (instances) on AWS.\n\nInstance types (family:size):\n• t3.micro — burstable, cheap, dev/test\n• m6i.large — general purpose\n• c6i.xlarge — compute optimized\n• r6g.2xlarge — memory optimized\n• p3.2xlarge — GPU (ML)\n\nKey components:\n• AMI — Amazon Machine Image (OS template)\n• Security Group — firewall rules\n• Key Pair — SSH access\n• Elastic IP — static public IP\n• EBS — block storage volume attached to instance\n• Auto Scaling Group — fleet of EC2 with auto scale\n\nPricing models:\n• On-Demand — pay per hour/second, no commitment\n• Reserved — 1-3 year commitment, 60-75% savings\n• Spot — unused capacity, up to 90% off, can be interrupted\n• Savings Plans — flexible commitment",
    codeExample: `# Launch EC2 with CLI
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --instance-type t3.micro \\
  --key-name my-key-pair \\
  --security-group-ids sg-12345678 \\
  --subnet-id subnet-12345678 \\
  --user-data '#!/bin/bash
    yum update -y
    yum install -y nodejs
    npm start' \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=my-server}]'

# SSH into instance
ssh -i ~/.ssh/my-key.pem ec2-user@<public-ip>

# Stop/terminate
aws ec2 stop-instances --instance-ids i-1234567890
aws ec2 terminate-instances --instance-ids i-1234567890`,
    starterCode: `// EC2: launch and manage virtual machines
function ec2Workflow(steps) {
  for (const step of steps) {
    hero.move(step.dir);
  }
}

ec2Workflow([
  { step: "choose AMI",        dir: "right" },
  { step: "pick instance type",dir: "right" },
  { step: "configure SG",      dir: "down" },
  { step: "launch instance",   dir: "right" },
  { step: "SSH connect",       dir: "right" },
  { step: "deploy app",        dir: "down" },
]);
hero.move("right");`,
    solutionCode: `function ec2Workflow(steps) {
  for (const step of steps) {
    hero.move(step.dir);
  }
}

ec2Workflow([
  { step: "choose AMI",         dir: "right" },
  { step: "pick instance type", dir: "right" },
  { step: "configure SG",       dir: "down" },
  { step: "launch instance",    dir: "right" },
  { step: "SSH connect",        dir: "right" },
  { step: "deploy app",         dir: "down" },
]);
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems), down, right (gem+exit).",
    tip: "Use Spot Instances for batch/ML workloads — up to 90% savings, just handle interruption gracefully.",
  },

  {
    id: "aws-5",
    courseId: "aws",
    number: 5,
    title: "Lambda — Serverless Functions",
    description: "Lambda runs code without managing servers. Pay only for execution time.",
    concept: "AWS Lambda",
    conceptExplanation:
      "Lambda is AWS's serverless compute service.\n\nHow it works:\n• Upload function code (zip or container)\n• Define trigger (API Gateway, S3 event, SQS, schedule, etc.)\n• AWS runs your function in response to events\n• Auto-scales to zero or millions of executions\n\nKey limits:\n• Max execution time: 15 minutes\n• Memory: 128MB – 10GB\n• Deployment package: 50MB zipped, 250MB unzipped\n• Ephemeral storage: /tmp up to 10GB\n\nPricing: first 1M requests/month free, then $0.20/million\n\nCold starts: first invocation spins up a new container (~100ms-1s)\nWarm starts: reuses existing container (<1ms)\n\nBest for: event processing, API backends, scheduled tasks, data transforms",
    codeExample: `// Lambda function handler
export const handler = async (event, context) => {
  console.log('Event:', JSON.stringify(event));

  // API Gateway event
  const { httpMethod, path, body } = event;

  if (httpMethod === 'POST' && path === '/users') {
    const { name, email } = JSON.parse(body);
    const user = await createUser({ name, email });
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
  }

  return { statusCode: 404, body: 'Not found' };
};

// Deploy with CLI
aws lambda create-function \\
  --function-name my-api \\
  --runtime nodejs20.x \\
  --role arn:aws:iam::123:role/lambda-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip`,
    starterCode: `// Lambda: serverless function execution
function lambdaLifecycle(events) {
  for (const event of events) {
    hero.move(event.dir);
  }
}

lambdaLifecycle([
  { trigger: "API Gateway",   dir: "right" },
  { trigger: "cold start",    dir: "right" },
  { trigger: "execute fn",    dir: "right" },
  { trigger: "return result", dir: "down" },
  { trigger: "scale to 100",  dir: "right" },
  { trigger: "scale to 0",    dir: "right" },
]);
hero.move("down");`,
    solutionCode: `function lambdaLifecycle(events) {
  for (const event of events) {
    hero.move(event.dir);
  }
}

lambdaLifecycle([
  { trigger: "API Gateway",   dir: "right" },
  { trigger: "cold start",    dir: "right" },
  { trigger: "execute fn",    dir: "right" },
  { trigger: "return result", dir: "down" },
  { trigger: "scale to 100",  dir: "right" },
  { trigger: "scale to 0",    dir: "right" },
]);
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Keep Lambda functions small and focused. Use Lambda Layers for shared dependencies to reduce package size.",
  },

  {
    id: "aws-6",
    courseId: "aws",
    number: 6,
    title: "RDS — Managed Databases",
    description: "RDS manages relational databases — backups, patching, replication handled automatically.",
    concept: "Amazon RDS",
    conceptExplanation:
      "RDS (Relational Database Service) manages PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, and Amazon Aurora.\n\nWhat RDS handles:\n• Automated backups (up to 35 days retention)\n• Software patching\n• Failover (Multi-AZ)\n• Read replicas for scale\n• Storage auto-scaling\n• Encryption at rest and in transit\n\nMulti-AZ deployment:\n• Synchronous standby replica in another AZ\n• Automatic failover in 60-120 seconds\n• Must-have for production\n\nRead Replicas:\n• Asynchronous copies for read scaling\n• Can promote to standalone\n• Cross-region replicas possible\n\nAurora: AWS's cloud-native DB\n• PostgreSQL/MySQL compatible\n• Up to 5x faster than MySQL\n• Auto-scales storage 10GB-128TB\n• Up to 15 read replicas",
    codeExample: `# Create RDS PostgreSQL instance
aws rds create-db-instance \\
  --db-instance-identifier my-postgres \\
  --db-instance-class db.t3.micro \\
  --engine postgres \\
  --engine-version 16.1 \\
  --master-username admin \\
  --master-user-password secret123 \\
  --allocated-storage 20 \\
  --multi-az \\
  --storage-encrypted \\
  --db-subnet-group-name my-subnet-group \\
  --vpc-security-group-ids sg-12345

# Create read replica
aws rds create-db-instance-read-replica \\
  --db-instance-identifier my-postgres-replica \\
  --source-db-instance-identifier my-postgres

# Describe instances
aws rds describe-db-instances --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceStatus,Endpoint.Address]'`,
    starterCode: `// RDS: managed relational database
const rdsSetup = [
  { step: "create instance",    dir: "right" },
  { step: "enable Multi-AZ",    dir: "right" },
  { step: "create read replica",dir: "right" },
  { step: "configure backups",  dir: "down" },
  { step: "connect app",        dir: "right" },
  { step: "monitor metrics",    dir: "right" },
];

for (const s of rdsSetup) {
  hero.move(s.dir);
}
hero.move("down");`,
    solutionCode: `const rdsSetup = [
  { step: "create instance",    dir: "right" },
  { step: "enable Multi-AZ",    dir: "right" },
  { step: "create read replica",dir: "right" },
  { step: "configure backups",  dir: "down" },
  { step: "connect app",        dir: "right" },
  { step: "monitor metrics",    dir: "right" },
];

for (const s of rdsSetup) {
  hero.move(s.dir);
}
hero.move("down");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Always use Multi-AZ for production RDS — the 2x cost is worth it for automatic failover.",
  },

  {
    id: "aws-7",
    courseId: "aws",
    number: 7,
    title: "CloudFront & Route 53",
    description: "CloudFront is AWS's CDN; Route 53 is AWS's DNS. Together they power global delivery.",
    concept: "Content Delivery & DNS",
    conceptExplanation:
      "CloudFront — Content Delivery Network:\n• 600+ edge locations worldwide\n• Caches content close to users\n• Reduces latency by 50-80%\n• Protects origins from traffic spikes\n• Integrates with WAF, Shield for security\n• Serves S3 static sites, API Gateway, EC2\n\nRoute 53 — DNS service:\n• Register domains\n• Route traffic with routing policies:\n  - Simple: one destination\n  - Weighted: A/B testing (70% new, 30% old)\n  - Latency: route to lowest-latency region\n  - Failover: primary + health-checked backup\n  - Geolocation: by country/continent\n  - Geoproximity: by distance with bias\n\nAlias records: Route 53-specific, free for AWS endpoints (ELB, CloudFront, S3)",
    codeExample: `# Create CloudFront distribution for S3
aws cloudfront create-distribution \\
  --origin-domain-name my-bucket.s3.amazonaws.com \\
  --default-root-object index.html

# Invalidate cache (after deploy)
aws cloudfront create-invalidation \\
  --distribution-id E1234567890 \\
  --paths "/*"

# Route 53: create hosted zone
aws route53 create-hosted-zone \\
  --name myapp.com \\
  --caller-reference unique-string-123

# Route 53: weighted routing for A/B test
# 90% → stable, 10% → canary
aws route53 change-resource-record-sets \\
  --hosted-zone-id Z123 \\
  --change-batch '{"Changes":[{
    "Action":"UPSERT",
    "ResourceRecordSet":{
      "Name":"api.myapp.com",
      "Type":"A",
      "SetIdentifier":"stable",
      "Weight":90,
      "AliasTarget":{"HostedZoneId":"Z2","DNSName":"stable-lb.amazonaws.com","EvaluateTargetHealth":true}
  }}]}'`,
    starterCode: `// CloudFront + Route 53: global delivery
const deliverySetup = [
  { step: "create CF distribution", dir: "right" },
  { step: "origin = S3 bucket",     dir: "right" },
  { step: "set cache TTL",          dir: "down" },
  { step: "Route53 alias record",   dir: "right" },
  { step: "latency routing",        dir: "right" },
  { step: "invalidate cache",       dir: "down" },
];

for (const s of deliverySetup) {
  hero.move(s.dir);
}
hero.move("right");`,
    solutionCode: `const deliverySetup = [
  { step: "create CF distribution", dir: "right" },
  { step: "origin = S3 bucket",     dir: "right" },
  { step: "set cache TTL",          dir: "down" },
  { step: "Route53 alias record",   dir: "right" },
  { step: "latency routing",        dir: "right" },
  { step: "invalidate cache",       dir: "down" },
];

for (const s of deliverySetup) {
  hero.move(s.dir);
}
hero.move("right");`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×2 (gems), down, right×2 (gems), down, right (gem+exit).",
    tip: "Always invalidate CloudFront cache after deployments. Set long TTLs (1 year) for hashed assets, short (0) for HTML.",
  },

  {
    id: "aws-8",
    courseId: "aws",
    number: 8,
    title: "SQS & SNS",
    description: "SQS is a message queue; SNS is a pub/sub notification service for decoupling services.",
    concept: "Messaging Services",
    conceptExplanation:
      "Decoupling services with messages prevents tight coupling and improves resilience.\n\nSQS (Simple Queue Service):\n• Message queue — producer sends, consumer polls\n• Standard queue: at-least-once, unordered\n• FIFO queue: exactly-once, ordered\n• Messages visible for 30s during processing\n• Dead Letter Queue (DLQ) for failed messages\n• Max message size: 256KB\n\nSNS (Simple Notification Service):\n• Fan-out to multiple subscribers simultaneously\n• Subscribers: SQS, Lambda, HTTP, email, SMS\n• Use case: send one event to many consumers\n\nCommon pattern (Fan-out):\nEvent → SNS Topic → [SQS Queue A, SQS Queue B, Lambda]\n\nEventBridge: more powerful SNS with routing rules\nSQS + Lambda: auto-triggers Lambda when messages arrive",
    codeExample: `import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sqs = new SQSClient({ region: 'us-east-1' });
const sns = new SNSClient({ region: 'us-east-1' });

// Send to SQS
await sqs.send(new SendMessageCommand({
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123/my-queue',
  MessageBody: JSON.stringify({ userId: 42, action: 'email' }),
  DelaySeconds: 0,
}));

// Publish to SNS (fan-out to all subscribers)
await sns.send(new PublishCommand({
  TopicArn: 'arn:aws:sns:us-east-1:123:order-events',
  Message: JSON.stringify({ orderId: 'ord-456', status: 'SHIPPED' }),
  Subject: 'Order Shipped',
}));`,
    starterCode: `// SQS + SNS: decouple services
function messagingFlow(events) {
  // SNS fan-out
  hero.move("right");
  hero.move("right");
  hero.move("down");
  // SQS consumers process
  for (const event of events) {
    hero.move(event.dir);
  }
}

messagingFlow([
  { dir: "right" },
  { dir: "right" },
  { dir: "down" },
]);`,
    solutionCode: `function messagingFlow(events) {
  hero.move("right");
  hero.move("right");
  hero.move("down");
  for (const event of events) {
    hero.move(event.dir);
  }
}

messagingFlow([
  { dir: "right" },
  { dir: "right" },
  { dir: "down" },
]);`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","exit","wall"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 4 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "SNS: right×2 (gems), down, SQS: right×2 (gems), down, down to exit.",
    tip: "Always configure a Dead Letter Queue (DLQ) on your SQS queues — it captures failed messages for debugging.",
  },

  {
    id: "aws-9",
    courseId: "aws",
    number: 9,
    title: "VPC & Networking",
    description: "VPC is your private network in AWS — control subnets, routing, and security.",
    concept: "Virtual Private Cloud",
    conceptExplanation:
      "VPC (Virtual Private Cloud) is your isolated network in AWS.\n\nKey components:\n• VPC — logical network boundary (e.g., 10.0.0.0/16)\n• Subnet — IP range within a VPC\n  - Public subnet — has route to Internet Gateway\n  - Private subnet — no direct internet access\n• Internet Gateway (IGW) — connects VPC to internet\n• NAT Gateway — lets private instances reach internet (outbound only)\n• Security Group — stateful firewall (allow only)\n• NACL — stateless firewall at subnet level\n• VPC Peering — connect two VPCs\n• Route Table — rules for routing packets\n\nBest practice architecture:\n• Public subnet: Load Balancer, NAT Gateway\n• Private subnet: EC2, RDS, ElastiCache\n• Never put databases in public subnets",
    codeExample: `# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Create subnets
aws ec2 create-subnet \\
  --vpc-id vpc-12345 \\
  --cidr-block 10.0.1.0/24 \\
  --availability-zone us-east-1a

# Create Internet Gateway
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway \\
  --vpc-id vpc-12345 \\
  --internet-gateway-id igw-12345

# Security Group: allow HTTPS from anywhere
aws ec2 create-security-group \\
  --group-name web-sg \\
  --vpc-id vpc-12345

aws ec2 authorize-security-group-ingress \\
  --group-id sg-12345 \\
  --protocol tcp \\
  --port 443 \\
  --cidr 0.0.0.0/0`,
    starterCode: `// VPC: your private AWS network
const vpcSetup = [
  { step: "create VPC",         dir: "right" },
  { step: "public subnet",      dir: "right" },
  { step: "private subnet",     dir: "right" },
  { step: "Internet Gateway",   dir: "down" },
  { step: "NAT Gateway",        dir: "right" },
  { step: "security groups",    dir: "right" },
  { step: "route tables",       dir: "down" },
];

for (const s of vpcSetup) {
  hero.move(s.dir);
}`,
    solutionCode: `const vpcSetup = [
  { step: "create VPC",       dir: "right" },
  { step: "public subnet",    dir: "right" },
  { step: "private subnet",   dir: "right" },
  { step: "Internet Gateway", dir: "down" },
  { step: "NAT Gateway",      dir: "right" },
  { step: "security groups",  dir: "right" },
  { step: "route tables",     dir: "down" },
];

for (const s of vpcSetup) {
  hero.move(s.dir);
}`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","gem"],
      ["wall","wall","wall","wall","wall","empty"],
      ["wall","wall","wall","wall","wall","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "right×3 (gems), down, right×2 (gems), down, down to exit.",
    tip: "Put all databases and application servers in private subnets. Only load balancers belong in public subnets.",
  },

  {
    id: "aws-10",
    courseId: "aws",
    number: 10,
    title: "Grand Finale",
    description: "Design a production-grade 3-tier AWS architecture with all the services working together.",
    concept: "AWS Production Architecture",
    conceptExplanation:
      "A production AWS app typically uses:\n\nFrontend tier:\n• S3 static hosting + CloudFront CDN\n• Route 53 for DNS\n• ACM for TLS certificate\n\nApplication tier:\n• EC2 Auto Scaling Group OR Lambda\n• Application Load Balancer\n• ElastiCache (Redis) for sessions/caching\n• SQS for async processing\n\nData tier:\n• RDS Multi-AZ (primary DB)\n• RDS Read Replica (read scaling)\n• S3 for file storage\n\nSecurity:\n• VPC with public/private subnets\n• Security Groups and NACLs\n• IAM roles for service-to-service\n• Secrets Manager for credentials\n• CloudTrail for audit logs\n• WAF on CloudFront/ALB\n\nMonitoring: CloudWatch, X-Ray, Cost Explorer",
    codeExample: `# Infrastructure as Code with CloudFormation
Resources:
  # Application Load Balancer
  ALB:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Subnets: [!Ref PublicSubnet1, !Ref PublicSubnet2]
      SecurityGroups: [!Ref ALBSecurityGroup]

  # Auto Scaling Group
  ASG:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      MinSize: 2
      MaxSize: 20
      DesiredCapacity: 2
      VPCZoneIdentifier: [!Ref PrivateSubnet1, !Ref PrivateSubnet2]
      LaunchTemplate:
        LaunchTemplateId: !Ref LaunchTemplate
        Version: !GetAtt LaunchTemplate.LatestVersionNumber

  # Use CDK or Terraform for real projects
  # aws-cdk: npx cdk deploy
  # terraform: terraform apply`,
    starterCode: `// Grand finale: full AWS 3-tier architecture
const architecture = {
  frontend: () => { hero.move("right"); hero.move("right"); },
  appTier:  () => { hero.move("down"); hero.move("right"); hero.move("right"); },
  dataTier: () => { hero.move("down"); hero.move("right"); },
};

architecture.frontend();
architecture.appTier();
architecture.dataTier();`,
    solutionCode: `const architecture = {
  frontend: () => { hero.move("right"); hero.move("right"); },
  appTier:  () => { hero.move("down"); hero.move("right"); hero.move("right"); },
  dataTier: () => { hero.move("down"); hero.move("right"); },
};

architecture.frontend();
architecture.appTier();
architecture.dataTier();`,
    grid: [
      ["wall","wall","wall","wall","wall","wall"],
      ["wall","hero","gem","gem","wall","wall"],
      ["wall","wall","wall","empty","wall","wall"],
      ["wall","wall","wall","gem","gem","wall"],
      ["wall","wall","wall","wall","empty","wall"],
      ["wall","wall","wall","wall","gem","exit"],
    ],
    heroStart: { row: 1, col: 1 },
    objectives: [
      { type: "collect-all-gems", description: "Collect all 5 💎 gems" },
      { type: "reach-exit", description: "Reach the exit 🚪" },
    ],
    hint: "frontend: right×2 (gems), appTier: down+right×2 (gems), dataTier: down+right (gem+exit).",
    tip: "Use Infrastructure as Code (Terraform or CDK) from day one — clicking in the console doesn't scale or reproduce reliably.",
  },
];
