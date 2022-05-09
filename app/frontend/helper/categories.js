const categories =[
                    {bodyCategory:"Upper extremity", bodyPart: "Shoulder + upper arm"}, 
                    {bodyCategory:"Upper extremity", bodyPart:"Elbow"}, 
                    {bodyCategory:"Upper extremity", bodyPart: "Forearm"}, 
                    {bodyCategory:"Upper extremity", bodyPart: "Hand" },
                    {bodyCategory:"Lower extremity", bodyPart: "Hip + thigh"}, 
                    {bodyCategory:"Lower extremity", bodyPart:"Knee"}, 
                    {bodyCategory:"Lower extremity", bodyPart: "Lower leg"}, 
                    {bodyCategory:"Lower extremity", bodyPart: "Foot" },
                    {bodyCategory:"Abdomen", bodyPart: "Front"}, 
                    {bodyCategory:"Abdomen", bodyPart: "Back" },
                  ]

const category_tree = {
  'upper-extremity' : ['shoulder+upperarm', 'elbow', 'forearm', 'hand'],
  'lower-extremity' : ['hip+thigh', 'knee', 'lowerleg', 'foot'],
  'abdomen' : ['front', 'back']
}

// this is a dictionary to translate ugly category strings to nice format
const format = {
  'upper-extremity' : 'Upper Extremity',
  'lower-extremity' : 'Lower Extremity',
  'abdomen' : 'Abdomen',
  'shoulder+upperarm' : 'Shoulder + Upper Arm',
  'elbow' : 'Elbow',
  'forearm' : 'Forearm',
  'hand' : 'Hand',
  'hip+thigh' : 'Hip + Thigh',
  'knee' : 'Knee',
  'lowerleg' : 'Lower Leg',
  'foot' : 'Foot',
  'front' : 'Front',
  'back' : 'Back'
}

export default categories
export { format, category_tree }