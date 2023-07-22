import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

interface IProps {
  closeModal: () => void;
  children: ReactNode;
  modal: boolean;
}

function Modal({ closeModal, children, modal }: IProps) {
  return (
    <Transition show={modal || false} as={Fragment}>
      <Dialog onClose={() => closeModal()}>
        <Transition.Child
          className="fixed inset-0 z-[99999] bg-black bg-opacity-50 transition-opacity"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        <Transition.Child
          className="fixed inset-0 z-[99999] flex p-6"
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 scale-75"
          enterTo="opacity-100 scale-100"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="max-w-5xl mx-auto h-full flex items-center">
            <Dialog.Panel className="w-full max-h-full rounded-3xl bg-white overflow-hidden">
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default Modal;
