import React from 'react';

const Navbar = () => {
    return (
        <div>
            <header
                className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
                <div className="px-5">
                    <div className="flex items-center justify-between">
                        <div className="flex shrink-0">
                            <a aria-current="page" className="flex items-center" href="/">
                                <p className="text-black text-xl font-sans font-semibold">Task Manager</p>
                            </a>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <a className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-indigo-700 hover:shadow-lg hover:scale-105 duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                               href="/">Add Task</a>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    );
};

export default Navbar;