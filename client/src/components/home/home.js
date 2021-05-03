import React, { useEffect, useState } from "react";
import useAuth from '../useAuth';

import { connect } from 'react-redux';
import { get_user_info } from "../../actions";

function Home(props) {
    const [isLoading, set_isLoading] = useState(true);

    // Get access token (used to make requests to spotify API)
    const accessToken = useAuth(props.code)

    useEffect(() => {

        if (!accessToken) return

        // Get basic user info (i.e name, email, followers)
        const fetchData = async () => {
            await props.get_user_info(accessToken);

            set_isLoading(false);
        }
        
        // Call the fetch data function above
        fetchData();

    }, [accessToken]) 

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <a href={props.current_user.external_urls.spotify}>
                <h1>{props.current_user.display_name}</h1>
            </a>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        current_user: state.current_user, 
    }
}

export default connect(mapStateToProps, {
    get_user_info
})(Home);