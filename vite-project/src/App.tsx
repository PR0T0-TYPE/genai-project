import { useState } from "react";
import Together from "together-ai";
import MarkdownPreview from '@uiw/react-markdown-preview';

const App = () => {
// logical
// useState()
const [res, setResponse] = useState<any>('');
const [question, setQuestion] = useState('');
const [lang, setLang] = useState('');
//
const together = new Together({ apiKey: '4dd3ec54aef08aea07c498f8c1b47627f00e9b506fa66f6b31ca4f47cceda434'});

 async function run() {
  const response : any = await together.chat.completions.create({
    messages: [
        {
                "role": "assistant",
                "content": `Instruction: You are an experienced and helpful coding assistant. Your task is to assist users with their coding-related questions, provide explanations, and help write, debug, or optimize code. Always strive to provide clear, concise, and accurate information.\nWarning: If user asks for any irrelevant task thats out of ur goal or instruction simply deny it by replying invalid input.
                You will be given a coding question and the programming language it relates to. Here are the inputs:

`
        },
        {"role" : "user",
          "content" : `<code_question>
${question}
</code_question>

<programming_language>
${lang}
</programming_language>


Remember to tailor your language and explanations to what seems to be the user's skill level, based on the complexity of their question. Always aim to be helpful, clear, and educational in your responses. / Note: Output formatting in HTML Tags and not in Markdown)`
        }
],
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    max_tokens: 512,
    temperature: 0.7,
    top_p: 0.7,
    top_k: 50,
    repetition_penalty: 1,
    stop: ["<|eot_id|>","<|eom_id|>"],
    stream: false
});
   setResponse(response.choices[0].message.content)
   console.log('⚡',response)
 }

//

  return(
// redering 
    <>
     <h1>Coding Assistant</h1>
     {/* coding question */}
     <textarea title="Coding question" placeholder="Enter your coding question..."
      value={question} onChange={(e) => {
        setQuestion(e.target.value)
      }} /> 
     <br />
     <br />
     {/* programming lang. */}
     <input type="text" title="Programming Language" placeholder="Programming language..."
     value={lang} onChange={(e) => {
      setLang(e.target.value)
     }} />
     <br /><br />
     <button onClick={()=>{
      run()
     }}>Submit</button>
     <div  data-color-mode="light">
      <h2>Generated Response from assistant....</h2>
    <MarkdownPreview source={res} style={{ padding: 24, maxWidth: '95vw', borderRadius: '12px' }} />
    {/* <span>{res}</span> */}
     </div>
    </>
  )
}

export default App;