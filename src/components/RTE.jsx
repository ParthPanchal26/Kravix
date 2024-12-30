import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'

export default function RTE({ name, control, label, defaultValue }) {
    return (
        <div className="w-full p-1">
            {label && <label className='inline-block text-slate-200 p-3'>{label}</label>}

            <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange } }) => (
                    <div className='shadow shadow-lg shadow-slate-900 shadow-md'>
                        <Editor
                            apiKey={conf.tinymceApiKye}
                            initialValue={defaultValue}
                            onEditorChange={(newValue) => {
                                onChange(newValue)
                            }}
                            init={{
                                content_css: "dark",
                                skin: "oxide-dark",
                                initialValue: defaultValue,
                                height: 400,
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: 'body { font-family:Helvetica, Arial, sans-sarif; font-size: 14px;}'
                            }}
                        />
                    </div>
                )}
            />
        </div>
    )
}