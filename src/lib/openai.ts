import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const openai = apiKey ? new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
}) : null;

export async function getHashtagSuggestions(query: string) {
  if (!openai) {
    throw new Error('OpenAI API key is not configured. Please check your environment variables.');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Generate 10 trending hashtags related to the query. Return only hashtags, one per line, starting with #."
        },
        {
          role: "user",
          content: `Generate trending hashtags for: ${query}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    // Parse hashtags from response
    const hashtags = content.split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('#'))
      .map(line => {
        const tag = line.replace(/^#/, '');
        return {
          tag,
          engagementRate: Number((Math.random() * 10).toFixed(1)),
          dailyUsage: Math.floor(Math.random() * 50000) + 5000,
          relatedTopics: generateRelatedTopics(),
          bestPostingTimes: generatePostingTimes(),
        };
      })
      .slice(0, 10);

    return { hashtags };
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    throw new Error(
      error.response?.data?.error?.message || 
      error.message || 
      'Failed to generate hashtag suggestions'
    );
  }
}

function generateRelatedTopics(): string[] {
  const topics = [
    'social media', 'digital marketing', 'content creation',
    'influencer', 'trending', 'viral', 'growth', 'engagement',
    'community', 'strategy'
  ];
  
  return topics
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}

function generatePostingTimes(): string[] {
  const times = [
    '9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM',
    '8:00 PM', '10:00 PM'
  ];
  
  return times
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
}