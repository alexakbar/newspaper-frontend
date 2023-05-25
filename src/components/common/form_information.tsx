export interface FormInformationProps {
  title: string;
  value: string;
}

const FormInformation: React.FunctionComponent<FormInformationProps> = (
  props
) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-300">
        {props.title}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 dark:text-gray-300 sm:mt-0">
        {props.value}
      </dd>
    </div>
  );
};

export default FormInformation;
