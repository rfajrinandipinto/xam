"use client"

import Image from "next/image";
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition, Listbox } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  XMarkIcon,
  CheckIcon, ChevronUpDownIcon, CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon ,PlusIcon as PlusIconOutline , ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon,   ArrowDownIcon, ArrowUpIcon, PlusIcon as PlusIconMini  } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Students', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
]

const people2 = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
]

const stats = [
  { id: 1, name: 'Total Subscribers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selected, setSelected] = useState(people2[3])
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusIconMini className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Add Exam Results
                    </Dialog.Title>
                    <div className="mt-2">
                  
                      <div className="mb-3 flex">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Students
                        </label>
                        <div className="mt-1">
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <div className="relative mt-1 w-48 mr-4">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="block truncate">{selected.name}</span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {people.map((person) => (
                                      <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                          classNames(
                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                          )
                                        }
                                        value={person}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                              {person.name}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active ? 'text-white' : 'text-indigo-600',
                                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                      </Listbox>  
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Exam
                        </label>
                        <div className="mt-1 ">
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <div className="relative mt-1 w-48">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="block truncate">{selected.name}</span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {people.map((person) => (
                                      <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                          classNames(
                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                          )
                                        }
                                        value={person}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                              {person.name}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active ? 'text-white' : 'text-indigo-600',
                                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                      </Listbox>  
                        </div>
                      </div>

                      </div>



                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Marks
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            
                          />
                        </div>
                      </div>    
                      
                     
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            <div className="py-6">
            
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-gray-900 mb-3">Active Exam</h1>

                      <div className="flex justify-between">
                      <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <div className="relative mt-1 w-52">
                                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                  <span className="block truncate">{selected.name}</span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {people.map((person) => (
                                      <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                          classNames(
                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                          )
                                        }
                                        value={person}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                              {person.name}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active ? 'text-white' : 'text-indigo-600',
                                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                              >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                      </Listbox>

                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen(true)}
                      >
                        Add Exam
                      </button>

                      {/* <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
                      </button> */}
                      </div>
                     

                      <div>
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                          {stats.map((item) => (
                            <div
                              key={item.id}
                              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6"
                            >
                              <dt>
                                <div className="absolute rounded-md bg-indigo-500 p-3">
                                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                              </dt>
                              <dd className="ml-16 flex items-baseline ">
                                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                                <p
                                  className={classNames(
                                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                    'ml-2 flex items-baseline text-sm font-semibold'
                                  )}
                                >
                                  {item.changeType === 'increase' ? (
                                    <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                                  ) : (
                                    <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                                  )}

                                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                  {item.change}
                                </p>
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                    
                  </div>
                  <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr className="divide-x divide-gray-200">
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                  Students
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-center">
                                  Subject 1
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-semibold text-gray-900 text-center">
                                  Subject 2
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pr-6 text-center">
                                  Subject 3
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pr-6 text-center">
                                  Subject 4
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-4 text-sm font-semibold text-gray-900 sm:pr-6 text-center">
                                  Subject 5
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {people.map((person) => (
                                <tr key={person.email} className="divide-x divide-gray-200">
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.name}
                                  </td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                    <table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                </tr>
                              ))}
                               {people.map((person) => (
                                <tr key={person.email} className="divide-x divide-gray-200">
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.name}
                                  </td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                    <table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                </tr>
                              ))}
                               {people.map((person) => (
                                <tr key={person.email} className="divide-x divide-gray-200">
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.name}
                                  </td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                    <table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                </tr>
                              ))}
                               {people.map((person) => (
                                <tr key={person.email} className="divide-x divide-gray-200">
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.name}
                                  </td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                    <table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                </tr>
                              ))}
                               {people.map((person) => (
                                <tr key={person.email} className="divide-x divide-gray-200">
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                    {person.name}
                                  </td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                    <table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6"><table className="w-full">
                                      <tr className="divide-x divide-gray-200">
                                        <td className="px-2"> 70</td>
                                        <td className="px-2"> B</td>
                                        <td className="px-2"> 3.5</td>
                                      </tr>
                                    </table></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
