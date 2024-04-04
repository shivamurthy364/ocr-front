import React, { useState } from 'react';

function TdsFileUpload() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [excelDownloadLink, setExcelDownloadLink] = useState('');
    const [filesUploaded, setFilesUploaded] = useState(false);
    const [showFileSelectMessage, setShowFileSelectMessage] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
        setFilesUploaded(false); 
        setShowFileSelectMessage(false); // Reset the message when files are selected
    };

    const handleUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            setShowFileSelectMessage(true); // Show message if no files selected
            return;
        }

        const formData = new FormData();
        for (let file of selectedFiles) {
            formData.append('file', file);
        }

        try {
            const response = await fetch('https://shivamurthy07.pythonanywhere.com/upload/pfchallan', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const excelBlob = await response.blob();
                const url = window.URL.createObjectURL(excelBlob);
                setExcelDownloadLink(url);
                setFilesUploaded(true); //Set filesUploaded to true after successful upload
            } else {
                alert('Error uploading files. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading files. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white border border-gray-200 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-3 text-center">Upload PDF and extract the data into MS Excel</h1>
            <div className="flex items-center pt-8">
                <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className="block flex-grow text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
                <button
                    onClick={handleUpload}
                    className="ml-4 bg-rose-50 text-purple-500 
                    font-semibold py-2 px-6 rounded-full
                     hover:bg-purple-100 transition duration-300"
                >
                    Upload
                </button>
            </div>
            
            {showFileSelectMessage && (
                <p className="text-red-600 font-semibold mt-2">Please select a file before proceeding.</p>
            )}

            {filesUploaded && (
                <p className="text-green-600 font-semibold mt-4">Files uploaded. You can download the Excel file now.</p>
            )}

            {excelDownloadLink && (
                <a
                    href={excelDownloadLink}
                    download="extracted_data.xlsx"
                    className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 text-center"
                >
                    Download Excel
                </a>
            )}
        </div>
    );
}
export default TdsFileUpload;