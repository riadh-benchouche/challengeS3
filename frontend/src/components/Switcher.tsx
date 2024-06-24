import {Description, Field, Label, Switch} from '@headlessui/react'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Switcher({enabled, setEnabled, title, description}: {
    enabled: boolean,
    setEnabled: (enabled: boolean) => void,
    title?: string,
    description?: string
}) {
    return (
        <Field as="div" className="flex items-center justify-between">
          <span className="flex flex-col">
            <Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
              {title || 'Statut'}
            </Label>
            <Description as="span" className="text-sm text-gray-500">
              {description || 'Activez ou désactivez cette option.'}
            </Description>
          </span>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                    enabled ? 'bg-primary-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    )}
                />
            </Switch>
        </Field>
    )
}