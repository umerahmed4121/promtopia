import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { revalidatePath } from "next/cache";



export const POST  =  async (req) => {

    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });
        await newPrompt.save();
        revalidatePath("/");
        return new Response(JSON.stringify(newPrompt), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

}