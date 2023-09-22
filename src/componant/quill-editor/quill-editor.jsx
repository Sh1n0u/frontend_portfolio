import ReactQuill from 'react-quill';
import React from 'react';
import './quill-editor.scss';

const QuillEditor = ({ value, onChange }) => {
    // Modules Quill
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
        ],
    };

    // Formats Quill
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link'];


    return (
        <div>
            <ReactQuill value={value} onChange={onChange} modules={modules} formats={formats} />
        </div>
    );
};

export default QuillEditor;
