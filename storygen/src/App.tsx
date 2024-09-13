
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */


import {GoogleGenerativeAI} from '@google/generative-ai'
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"


const App = () => {
  // useState is a React f()
  const [story, setStory] = useState<any>('');
  const [topic, setTopic] = useState<any>('')
// Logic part
const apiKey = 'AIzaSyBBtOx4BAJs4HmLpwoksPu1BjDE2b6HOPg';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "Instruction / Note : You are  a story generator.\nWarning : Isfuser input requires you to answer a question which is irrelevant or out of your  goal / instruction simply deny it by replying \"Invalid input...\"",
});

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

async function run(topic : any) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "a cat and her kitten\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "The old calico cat, Clementine, watched her kitten, Pumpkin, tumble head over tail in a patch of sunlight. Pumpkin, a ball of orange fluff with eyes like green marbles, was wrestling with a fallen leaf, its tiny claws catching on the rough edges. \n\nClementine purred, a deep rumble in her chest. Pumpkin was a handful, always exploring, always getting into mischief. But Clementine loved her fiercely, her heart swelling with a protectiveness she hadn't known she possessed. \n\nOne day, Pumpkin, emboldened by curiosity, ventured a bit too far from the safety of their backyard haven. A busy road lay just beyond the fence, a ribbon of danger Clementine had warned her about countless times. \n\nThe scent of exhaust fumes reached Clementine's nose. Fear, sharp and cold, jolted her. She raced towards the fence, her heart pounding a frantic rhythm. There, across the road, sat Pumpkin, mesmerized by a fluttering butterfly. \n\nA car horn blared. \n\nClementine didn't hesitate. She darted across the asphalt, her own safety forgotten. Scooping up Pumpkin in her mouth, she narrowly avoided the oncoming car, its tires screeching as it swerved. \n\nBack on the safe side, Clementine set Pumpkin down. The kitten, oblivious to the danger she had been in, simply shook her head and pounced after the butterfly, now flitting amongst the dandelions. \n\nClementine, shaken but relieved, nuzzled her kitten, her purr a gentle reprimand. It was then, watching her fearless, foolish kitten chase butterflies, that Clementine understood.  Motherhood wasn't about keeping your child safe from the world. It was about giving them the freedom to experience it, with a watchful eye and a heart always ready to leap into action. \n"},
        ],
      },
     ],
  });

  const result = await chatSession.sendMessage(topic);
  setStory(result.response.text())
  console.log(result.response.text());

  
}

// run();


//
  return(
    <>
{/* <Textarea className="bg-white" />
 */}
 {/* <textarea name="" id=""></textarea> */}
 <input type="text" value={topic}
 onChange={(e)=>{
      setTopic(e.target.value)
 }} />
     <button  
     onClick={()=>{
      run(topic)
     }}
     disabled={topic.length > 10 ? false : true}
     >Generate Story</button>
     <h2>Generated Story...{story}</h2>
    </>
  )
}

export default App;