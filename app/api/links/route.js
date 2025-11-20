import clientPromise from "@/lib/mongodb";

export async function GET(request) {
    const client = await clientPromise;
    const db = client.db("tinyurl");
    const collection = db.collection("url");

    const { searchParams } = new URL(request.url);

    const url = searchParams.get("url");
    const shortUrl = searchParams.get("shortUrl");
    // const {url, shortUrl} = await ctx.params;
    // const url = await searchParams.get('url');
    console.log("Url: ", url);

    // const shortUrl = await searchParams.get('shortUrl');
    console.log("Short url: ", shortUrl);

    try {
        const query = {};
        if (url !== "undefined" && url !== '') {
            query.url = { $regex: url, $options: "i" };
        }
        if (shortUrl !== "undefined" && shortUrl !== '') {
            query.shortUrl = { $regex: shortUrl, $options: "i" };
        }

        console.log(query);

        const links = await collection.find(query).toArray() || [];
        const plainLinks = await links.map(link => ({
            url: link?.url,
            shortUrl: link?.shortUrl,
            totalClicks: link?.totalClicks,
            lastClickedTime: link?.lastClickedTime
        }));

        return Response.json({ success: true, error: false, message: "Got Links", data: plainLinks },{status:200});

    }

    catch (err) {
        console.log("Fetch error: ", err);
        return Response.json({ success: false, error: true, message: "Error in fetching" },{status:500});
    }

}

export async function POST(request) {
    const client = await clientPromise;
    const db = client.db("tinyurl");
    const collection = db.collection("url");

    const body = await request.json();

    const doc = await collection.findOne({ shortUrl: body.shortUrl });
    if (doc) {
        return Response.json({ success: false, error: true, message: "Short URL already exists" }, {status:409});
    }

    await collection.insertOne({
        url: body.url,
        shortUrl: body.shortUrl,
        totalClicks: 0
    });

    return Response.json({ success: true, error: false, message: "Short URL generated successfully" },{status:200});
}