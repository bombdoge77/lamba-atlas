const categories =[
                    {bodyCategory:"Upper Extremity", bodyPart: "Shoulder + Upper Arm"}, 
                    {bodyCategory:"Upper Extremity", bodyPart:"Elbow"}, 
                    {bodyCategory:"Upper Extremity", bodyPart: "Forearm"}, 
                    {bodyCategory:"Upper Extremity", bodyPart: "Hand" },
                    {bodyCategory:"Lower Extremity", bodyPart: "Hip + Thigh"}, 
                    {bodyCategory:"Lower Extremity", bodyPart:"Knee"}, 
                    {bodyCategory:"Lower Extremity", bodyPart: "Lower Leg"}, 
                    {bodyCategory:"Lower Extremity", bodyPart: "Foot" },
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

const format_inverse = Object.fromEntries(Object.entries(format).map(a => a.reverse()))

export default categories
export { format, format_inverse, category_tree }