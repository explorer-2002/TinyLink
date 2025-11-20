export async function GET(){
    return Response.json({success:true, data:{ "ok": true, "version": "1.0" }},{status:200});
}