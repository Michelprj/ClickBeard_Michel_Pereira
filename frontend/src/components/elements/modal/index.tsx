"use client";

import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { MdOutlineClose } from "react-icons/md";

type ModalType = {
  open: boolean; 
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteModal: () => void;
  textMain: string;
  titleModal: string;
  buttonPrincipalText: string;
}

export default function Modal({ open, setOpen, onDeleteModal, textMain, titleModal, buttonPrincipalText }: ModalType) {
  return (
    <div className="mb-5">
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" open={open} onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 z-[999] overflow-y-auto bg-[#1111111f]">
            <div className="flex min-h-screen items-center justify-center px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="div"
                  className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black"
                >
                  <div className="flex items-center justify-between bg-[var(--primary-color)] px-5 py-3">
                    <h5 className="text-lg text-white font-bold">{titleModal}</h5>
                    <button
                      type="button"
                      className="text-white"
                      onClick={() => setOpen(false)}
                    >
                      <MdOutlineClose size={25} />
                    </button>
                  </div>
                  <div className="p-5 bg-[#181717] text-white">
                    <p>
                      {textMain}
                    </p>
                    <div className="mt-8 flex gap-4 items-center justify-end">
                      <button
                        type="button"
                        className="px-4 py-2 text-white font-semibold border border-[var(--primary-color)] rounded hover:bg-[var(--primary-color)]"
                        onClick={() => setOpen(false)}
                      >
                        Fechar
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2.5 bg-red-900 hover:bg-red-800 text-white font-semibold rounded"
                        onClick={() => onDeleteModal()}
                      >
                        {buttonPrincipalText}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
