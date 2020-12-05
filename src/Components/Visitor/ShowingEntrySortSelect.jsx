import React, { Component } from 'react';


class ShowingEntrySortSelect extends Component {
    state = {  }
    render() {
        const {currentPosts, allPosts} = this.props

        return ( 
        <div>
            <div className="showing-entry-select">
                <div className="showing-entry-select-left-content">
                    {currentPosts.length !== 0 &&
                    <p>{`Showing 1 - ${currentPosts.length} of ${allPosts.length} results`}</p>
                    }
                </div>
                <div className="showing-entry-select-right-content">
                    <span>Sort by </span>
                    <select name="sort_select">
                        <option>Price - Low to High</option>
                        <option>Price - High to Low</option>
                    </select>
                </div>
            </div>
            <div className="clearboth"></div>
        </div>
         );
    }
}
 
export default ShowingEntrySortSelect;