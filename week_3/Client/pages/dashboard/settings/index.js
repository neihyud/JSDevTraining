import DefaultLayout from '@/layout/DefaultLayout/DefaultLayout'
import React from 'react'

const Settings = () => {
    return (
        <DefaultLayout indexTab={3}>
            <div className="center">
                Page Settings
                <style jsx>
                    {`
                        div {
                            font-weight: 700;
                            font-size: 20px;
                        }
                    `}
                </style>
            </div>
        </DefaultLayout>
    )
}

export default Settings
