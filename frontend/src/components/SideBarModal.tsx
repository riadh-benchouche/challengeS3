import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import React, {Dispatch, SetStateAction} from "react";

export default function SideBarModal({open, setOpen, title, description, children, handleSubmit}: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    title: string,
    description: string
    children: React.ReactNode
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
    return (
        <Dialog className="relative z-50" open={open} onClose={setOpen}>
            <div className="fixed inset-0"/>
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <DialogPanel
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                                  onSubmit={handleSubmit}>
                                <div className="h-0 flex-1 overflow-y-auto">
                                    <div className="bg-primary-700 px-4 py-6 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <DialogTitle
                                                className="text-base font-semibold leading-6 text-white">{title}</DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="relative rounded-md bg-primary-700 text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="absolute -inset-2.5"/>
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            <p className="text-sm text-gray-200">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="divide-y divide-gray-200 px-4 sm:px-6 py-8">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-shrink-0 justify-end px-4 py-4 space-x-2">
                                    <Button
                                        type="button"
                                        primary={false}
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        primary={true}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}