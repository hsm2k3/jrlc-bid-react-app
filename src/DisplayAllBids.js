import React, {useEffect} from 'react';
import axios from "axios";

const DisplayAllBids = () => {
    useEffect(() => {
        axios.get('http://localhost:8000/api/bids')
            .then(({ data }) => {
                updateData(data);
                const localSelectedTab = localStorage.getItem('selectedTabKey');
                if (localSelectedTab && data.find(({ key }) => String(key) === localSelectedTab)) {
                    updateSelectedTab(localSelectedTab);
                } else {
                    localStorage.setItem('selectedTabKey', data[0]?.key);
                    updateSelectedTab(data[0]?.key);
                }
            })
            .catch(() => { onShowToast('Error', 'Could not load data, please try again later.') });
    }, []);


    return (
        <div>

        </div>
    );
};

export default DisplayAllBids;