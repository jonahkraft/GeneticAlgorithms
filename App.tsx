import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import LogoImage from "../resources/images/logo_institute.webp"
import { Tab, TabContainer } from './ui/Tabs'

const demos = import.meta.glob('./demo/**/Demo.tsx')
const exercises = import.meta.glob('./exercises/**/Exercise.tsx')

export const isBlink = navigator.userAgent.includes("Chrome")

// this function is called every time 
// the component gets rendered by react
const App = () => {
  const params = useSearchParams();
  let activeTab = (params[0].has("tab") ? (Number.parseInt(params[0].get("tab"))) : 0)
  if (isNaN(activeTab) || !(activeTab in [0, 1])) activeTab = 0;
  
  console.log(isBlink);

  const browserSpecificFullScreenClass = isBlink ? 'h-screen' : 'fullbody'

  return (
    <div className={'flex justify-center overflow-y-scroll text-jgu2 ' + browserSpecificFullScreenClass}>
      <div className={'w-full gap-2 container p-4 ' + browserSpecificFullScreenClass}>
        <div className='h-20 flex justify-between w-full'>
          <div className='text-xl pt-5 pb-5 h-full flex justify-center flex-col'>
            <div>Computer Graphics 1</div>
            <div className='text-jgu1 font-bold'>Winter Term 23</div>
          </div>
          <img className='h-full hidden md:block -mr-2' src={LogoImage}></img>
        </div>
        <TabContainer activeTab={activeTab}>
          <Tab title="Demos" className='flex flex-col justify-around bg-white pt-4'>
            {
              Object.keys(demos).map((path) => {
                const basePath = path.replace('./demo/', '').replace('/Demo.tsx', '')
                const components = basePath.split('-')
                const demoName = components[1]
                const demoID = components[0]
                return (
                  <Link
                    to={`/demo/${demoID}`}
                    reloadDocument
                    className='shadow rounded-xl mt-4 mb-4 transition-all hover:bg-jgu1 hover:text-neutral-50 duration-300 ease-in-out group hover:shadow-xl uppercase flex overflow-hidden hover:font-bold' 
                    key={demoID}
                  >
                    <div className='bg-neutral-400 w-16 p-4 flex items-center justify-center text-white group-hover:bg-jgu1 transition-all duration-300 ease-in-out'>{demoID}</div>
                    <div className='grow p-4'>
                      <div className='w-0 group-hover:w-full text-center transition-all duration-300 whitespace-nowrap'>
                        {demoName.replace(/([a-z])([A-Z])/g, '$1 $2')}
                      </div>
                    </div>
                  </Link>
                )
              })
            }
          </Tab>
          <Tab title="Exercises" className='flex flex-col justify-around bg-white pt-4'>
            {
              Object.keys(exercises).map((path) => {
                const basePath = path.replace('./exercises/', '').replace('/Exercise.tsx', '')
                const components = basePath.split('-')
                const exerciseName = components[1]
                const exerciseID = components[0]
                return (
                  <Link
                    to={`/exercises/${exerciseID}`}
                    reloadDocument
                    className='shadow rounded-xl mt-4 mb-4 transition-all hover:bg-jgu1 hover:text-neutral-50 duration-300 ease-in-out group hover:shadow-xl uppercase flex overflow-hidden hover:font-bold' 
                    key={exerciseID}
                  >
                    <div className='bg-neutral-400 w-16 p-4 flex items-center justify-center text-white group-hover:bg-jgu1 transition-all duration-300 ease-in-out'>{exerciseID}</div>
                    <div className='grow p-4'>
                      <div className='w-0 group-hover:w-full text-center transition-all duration-300 whitespace-nowrap'>
                        {exerciseName.replace(/([a-z])([A-Z])/g, '$1 $2')}
                      </div>
                    </div>
                  </Link>
                )
              })
            }
          </Tab>
        </TabContainer>
      </div>
    </div>
  )
}

export default App
