import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { Helmet } from 'react-helmet'

import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom'

import App, { isBlink } from './App'

import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"

const demos = import.meta.glob('./demo/**/Demo.tsx')
const exercises = import.meta.glob('./exercises/**/Exercise.tsx')
const baseName = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Helmet>
      <title>Computer Graphics 1 - Demos</title>
    </Helmet>
    <Router basename={baseName == "/" ? "/" : ("/" + baseName.split("/").slice(3).join("/"))}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          element={
            <div className={'relative overflow-hidden ' + (isBlink ? "h-screen" : "fullbody")}>
              <Outlet />

              <Link 
                to="/" 
                className='absolute top-4 left-4 w-16 h-16 z-50 rounded-full flex items-center justify-center transition-all duration-200  bg-jgu2 hover:bg-jgu1 hover:scale-110 active:scale-100 text-white'
              >
                <i className='bi bi-arrow-left text-3xl'></i>
              </Link>
            </div>
          }
        >
          {
            Object.keys(demos).map((path) => {
              const basePath = path.replace('./demo/', '').replace('/Demo.tsx', '')
              const components = basePath.split('-')
              const Component = React.lazy(demos[path] as unknown as () => Promise<{ default: React.ComponentType<any> }>)
              return (
                <Route
                  path={`/demo/${components[0]}`}
                  element={<Component />}
                  key={path}
                />
              )
            })
          }
        </Route>
        <Route
          element={
            <div className={'relative overflow-hidden ' + (isBlink ? "h-screen" : "fullbody")}>
              <Outlet />

              <Link 
                to="/?tab=1" 
                className='absolute top-4 left-4 w-16 h-16 z-50 rounded-full flex items-center justify-center transition-all duration-200  bg-jgu2 hover:bg-jgu1 hover:scale-110 active:scale-100 text-white'
              >
                <i className='bi bi-arrow-left text-3xl'></i>
              </Link>
            </div>
          }
        >
          {
            Object.keys(exercises).map((path) => {
              const basePath = path.replace('./exercises/', '').replace('/Exercise.tsx', '')
              const components = basePath.split('-')
              const Component = React.lazy(exercises[path] as unknown as () => Promise<{ default: React.ComponentType<any> }>)
              return (
                <Route
                  path={`/exercises/${components[0]}`}
                  element={<Component />}
                  key={path}
                />
              )
            })
          }
        </Route>
      </Routes>
    </Router>
  </>,
)
