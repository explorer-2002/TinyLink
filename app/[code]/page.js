import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const shortUrl = (await params).code;

    const client = await clientPromise;
    const db = client.db("tinyurl");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shortUrl: shortUrl });
    if (doc) {
        try {
            console.log("Inside try");
            const lastClicked = new Date().toLocaleString();

            await collection.updateOne(
                { shortUrl: shortUrl },
                {
                    $inc: { totalClicks: 1 },
                    $set: { lastClickedTime: lastClicked }
                }
            );
        }

        catch (err) {
            console.log("Err incrementing clicks: ", err);
        }

        redirect(doc.url);
    }

    // else {
    //     redirect(process.env.NEXT_PUBLIC_HOST);
    // }

    return notFound();
}