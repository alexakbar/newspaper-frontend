import { TagIcon } from "@heroicons/react/24/outline";
import { PropsValue } from "react-select";

export interface FormMultiSelectProps {
  title: string;
  data: PropsValue<any>[] | null;
  setUpdate: (value: any) => void;
}

const FormMultiSelect: React.FunctionComponent<FormMultiSelectProps> = (
  props
) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
        {props.title}
      </dt>
      <dd className="mt-2 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200"
        >
          <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
            <div className="flex w-0 flex-1 items-center">
              <TagIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium dark:text-gray-300">
                  {props.data?.map((e) => e.label).join(", ") ??
                    "No Selected Source"}
                </span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={props.setUpdate}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Update
              </button>
            </div>
          </li>
        </ul>
      </dd>
    </div>
  );
};

export default FormMultiSelect;
