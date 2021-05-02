import React, { useEffect, useState } from "react";
import useAuth from '../useAuth';

import { connect } from 'react-redux';
import { get_user_info } from "../../actions";

function Home(props) {
    const [isLoading, set_isLoading] = useState(true);

    const accessToken = useAuth(props.code)

    useEffect(() => {

        if (!accessToken) return

        const fetchData = async () => {
            await props.get_user_info(accessToken);

            set_isLoading(false);
        }

        fetchData();
    }, [accessToken]) 

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{props.current_user.display_name}</h1>
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