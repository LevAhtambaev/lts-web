import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TravelDetailsPage.css';
import Header from "../components/Header";
import PreviewImage from "../components/PreviewImage";
import TravelDescription from "../components/TravelDescription";
import PlacesList from "../components/PlacesList";
import AddPlaceButton from "../components/AddPlaceButton";
import UploadModal from "../components/UploadModal";

const TravelDetailsPage = () => {
    const { uuid } = useParams();
    const [travel, setTravel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchTravelDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/travel/${uuid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch travel details');
                }
                const data = await response.json();
                setTravel(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTravelDetails();
    }, [uuid]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const binaryData = reader.result;

            try {
                const response = await fetch(`http://localhost:8000/api/travel/preview/${uuid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'image/jpeg',
                    },
                    body: binaryData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload preview image');
                }

                setShowUploadModal(false);
                window.location.reload();
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };

        reader.readAsArrayBuffer(selectedFile);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!travel) {
        return <div>No travel details found.</div>;
    }

    return (
        <div>
            <Header />
            <div className="travel-details-page">
                <PreviewImage travel={travel} setShowUploadModal={setShowUploadModal} />
                <div className="content-container">
                    <TravelDescription description={travel.description} />
                    <PlacesList places={travel.places} travelUuid={uuid} />
                    <AddPlaceButton onClick={() => { /* handle adding place */ }} travelUuid={uuid} />
                </div>
                <UploadModal
                    show={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    onFileChange={handleFileChange}
                    onUploadClick={handleUploadClick}
                />
            </div>
        </div>
    );
};

export default TravelDetailsPage;
