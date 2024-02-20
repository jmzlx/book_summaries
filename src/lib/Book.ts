import OpenAI from "openai";

const openai = new OpenAI();

export interface IBook {
  title: string;
  slug: string;
  summary?: string;
  author?: string;
}

export default class Book implements IBook {
  title: string;
  slug: string;
  summary?: string;
  author?: string;

  constructor(title?:string, slug?:string) {

    if (!title && slug)
      title = this.unsluggify(slug);
    
    if (!title) title = '';
    if (!slug) slug = this.sluggify(title);
    
    this.title = title;
    this.slug = slug;
  }

  sluggify(text:string) {
    return text.toLowerCase().replace(/ /g, "-");
  }

  unsluggify(text:string) {
    return text.replace(/-/g, " ").replace(/\b\w/g, s => s.toUpperCase());
  }

  async summarize() {

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Provide a detailed summary of the book "${this.title}"`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const [ choice ] = chatCompletion.choices
    return this.summary = choice.message.content || '';
    
  }
}