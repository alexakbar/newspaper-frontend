import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import React from "react";

// create model
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  optionData?: any[];
}

const ModalForm: React.FunctionComponent<ModalProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [optionsData, setOptionsData] = React.useState<any[]>([]);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(props.isOpen);
    setOptionsData(props.optionData!);
  }, [props.isOpen, props.optionData]);

  // on close modal
  const onClose = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={onClose}
        >
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

          <div className="relative ">
            <div className="absolute">
              <div className="fixed z-10 inset-x-0 top-0 ">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-gray-900">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3
                              className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                              id="modal-title"
                            >
                              Invite your team
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              Your new project has been created. Invite your
                              team to collaborate on this project.
                            </p>

                            <div className="mt-4">
                              <Select
                                isMulti
                                name="colors"
                                options={optionsData}
                                onChange={(selected) => {}}
                                className="react-select"
                                classNamePrefix="react-select"
                                menuPortalTarget={document.body}
                                styles={{
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                  }),
                                }}
                                classNames={{
                                  control: (base) =>
                                    `block mt-2 w-full z-auto px-5 py-0.5`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-900">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                          onClick={() => onClose()}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => onClose()}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ModalForm;
