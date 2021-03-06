import React, { PropTypes } from 'react';
import { stitch } from 'keo';
import { Link } from 'react-router';
import config from '../config';

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    catalogue: PropTypes.array.isRequired,
    pageNumber: PropTypes.number,
    disableFirstPage: PropTypes.bool
};

/**
 * @method getDefaultProps
 * @return {Object}
 */
const getDefaultProps = () => {
    return { pageNumber: 1, disableFirstPage: false };
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    const maxPage = Math.ceil(props.catalogue.length / config.perPage);
    const previousPage = props.pageNumber + 1;
    const nextPage = props.pageNumber - 1;

    return (
        <main className="component pagination">
            <ul>
                <li className={`previous ${previousPage > maxPage ? 'disabled' : ''}`}>
                    <Link to={`/archive/page-${previousPage}`}>
                        &laquo; Previous
                    </Link>
                </li>
                <li className="page-number">
                    Page {props.pageNumber} of {maxPage === Infinity ? String.fromCharCode(8734) : maxPage}
                </li>
                <li className={`next ${nextPage <= 0 ? 'disabled' : ''}`}>
                    <Link to={props.disableFirstPage && nextPage === 1 ? '/' : `/archive/page-${nextPage}`}>
                        Next &raquo;
                    </Link>
                </li>
            </ul>
        </main>
    );

};

export default stitch({ propTypes, getDefaultProps, render });
