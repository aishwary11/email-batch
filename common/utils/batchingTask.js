import Queue from "bull";
import sendMail from "./mail";

const emailQueue = new Queue("email-queue", { redis: { host: "localhost", port: 6379 } });
emailQueue.process(async (job) => {
  const info = await sendMail(job.data.from, job.data.to, job.data.subject, job.data.text);
  console.log("Message sent: %s", info.messageId);
  return info;
});

const sendBulkMails = async (emailList) => {
  const batchSize = 1000;
  for (let i = 0; i < emailList.length; i += batchSize) {
    const batch = emailList.slice(i, i + batchSize);
    await Promise.all(batch.map(email => emailQueue.add({ from: email.from, to: email.to, subject: email.subject, text: email.text })));
  }
};

export default sendBulkMails;