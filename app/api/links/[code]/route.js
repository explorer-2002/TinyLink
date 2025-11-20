import clientPromise from "@/lib/mongodb";

export async function GET(request,{ params }) {
    const client = await clientPromise;
    const db = client.db("tinyurl");
    const collection = db.collection("url");

    try {
        const {code} = await params;

        const link = await collection.findOne({ shortUrl: code }) || {};
        return Response.json({ success: true, error: false, message: "Got Links", data: link },{status:200});
    }

    catch (err) {
        return Response.json({ success: false, error: true, message: "Error in fetching" },{status:500});
    }

}

export async function DELETE(request,{ params }) {
    const client = await clientPromise;
    const db = client.db("tinyurl");
    const collection = db.collection("url");

    const {code} = await params;

    try {
        const deletedLink = await collection.findOneAndDelete({ shortUrl: code });

        return Response.json({ success: true, error: false, message: "Link Deleted Successfully", data: deletedLink },{status:200})
    }

    catch (err) {
        return Response.json({ success: true, error: true, message: `Error in deleting link: ${err?.message}` },{status:500})

    }
}