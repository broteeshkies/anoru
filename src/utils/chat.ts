export const chat = {
  messages: [] as { role: 'user' | 'assistant'; content: string }[],
};

export function addMessage(role: 'user' | 'assistant', content: string) {
  chat.messages.push({ role, content });
}
