import React from 'react'
import { ReactComponent as Search } from '../../../assets/icons/ic-search.svg';
import { ReactComponent as Clear } from '../../../assets/icons/ic-error.svg';
import ReactSelect, { components } from 'react-select';
import { multiSelectStyles, Checkbox, Option } from '../../common';
import { DropdownIndicator, ValueContainer } from '../charts.util';

export default function DeployedChartFilters({ handleFilterChanges, appStoreName, searchApplied, handleCloseFilter, setAppStoreName, selectedChartRepo, includeDeprecated, chartRepos, environment }) {
    const MenuList = (props) => {
        return (
            <components.MenuList {...props}>
                {props.children}
                <div className="chart-list-apply-filter flex bcn-0 pt-10 pb-10">
                    <button type="button" className="cta flex cta--chart-store" disabled={false} onClick={(selected: any) => { handleFilterChanges(selected, "chart-repo") }}>
                        Apply Filter
                  </button>
                </div>
            </components.MenuList>
        );
    };
    return (
        <div>
            <div className="chart-group__header">
                <div className="flexbox flex-justify  w-100">
                    <form onSubmit={(e) => handleFilterChanges(e, "search")} style={{ width: "none" }} className="search position-rel" >
                        <Search className="search__icon icon-dim-18" />
                        <input type="text" placeholder="Search charts" value={appStoreName} className="search__input bcn-0" onChange={(e) => setAppStoreName(e.target.value)} />
                        {searchApplied ? <button className="search__clear-button" type="button" onClick={(e) => handleFilterChanges(e, "clear")}>
                            <Clear className="icon-dim-18 icon-n4 vertical-align-middle" />
                        </button> : null}
                    </form>
                    <div className="flex">
                        <ReactSelect className="date-align-left fs-13 pr-16"
                            placeholder="Environment : All"
                            name="repository "
                            // value={selectedChartRepo}
                            options={environment}
                            closeOnSelect={false}
                            // onChange={setSelectedChartRepo}
                            isClearable={false}
                            isMulti={true}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onMenuClose={handleCloseFilter}
                            components={{
                                DropdownIndicator,
                                Option,
                                ValueContainer,
                                IndicatorSeparator: null,
                                ClearIndicator: null,
                                MenuList,
                            }}
                            styles={{ ...multiSelectStyles }} />
                        <ReactSelect className="date-align-left fs-13"
                            placeholder="Repository : All"
                            name="repository "
                            // value={selectedChartRepo}
                            options={chartRepos}
                            closeOnSelect={false}
                            // onChange={(e) => handleFilterChanges(e,"chart-repo") }
                            isClearable={false}
                            isMulti={true}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onMenuClose={handleCloseFilter}
                            components={{
                                DropdownIndicator,
                                Option,
                                ValueContainer,
                                IndicatorSeparator: null,
                                ClearIndicator: null,
                                MenuList,
                            }}
                            styles={{ ...multiSelectStyles }} />
                        <Checkbox rootClassName="ml-16 mb-0 fs-14 cursor bcn-0 pt-8 pb-8 pr-12 date-align-left--deprecate"
                            isChecked={includeDeprecated === 1}
                            value={"CHECKED"}
                            onChange={(event) => { let value = (includeDeprecated + 1) % 2;console.log(value); handleFilterChanges(value, "deprecated") }} >
                            <div className="ml-5"> Show only deprecated</div>
                            
                        </Checkbox>
                    </div>
                </div>
            </div>
        </div>
    )
}
