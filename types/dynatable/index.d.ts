// Type definitions for jquery.dynatable v0.3.1
// Project: http://www.dynatable.com/
// Definitions by: François Massart <https://github.com/francoismassart>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/// <reference types="jquery" />

interface JQuery {
    /**
    * @constructor
    */
    dynatable: JQueryDynatable.Dynatable;
}

/** Static members of jQuery (those on $ and jQuery themselves) */
interface JQueryStatic {
    /**
     * Global dynatable plugin setting defaults
     *
     * @param options The configuration options to be set globally
     */
    dynatableSetup(options: JQueryDynatable.Options): void;
}

declare namespace JQueryDynatable {
    interface Features {
        /**
         * Enable the pagination feature
         *
         * @default true
         */
        paginate?: boolean;
        /**
         * Enable the sorting feature
         *
         * @default true
         */
        sort?: boolean;
        /**
         * Enable the pushState feature
         * Used to update the page URL parameters and cache the query result for the browser's forward- and back-buttons
         *
         * @default true
         */
        pushState?: boolean;
        /**
         * Enable the search feature
         *
         * @default true
         */
        search?: boolean;
        /**
         * Enable the recordCount feature
         * When pagination is enabled, dynatable will also show the currently displayed records and the total number of records
         *
         * @default true
         */
        recordCount?: boolean;
        /**
         * Enable the perPageSelect feature
         * The perPageSelect will insert a form control filled with the options from `perPageOptions`
         *
         * @default true
         */
        perPageSelect?: boolean;
    }
    interface Column {
        index: number;
        label: string;
        /**
         * Determined by the `data-dynatable-column` or using the `defaultColumnIdStyle`
         *
         * @example
         * // Using the `defaultColumnIdStyle` of `camelCase`
         * // `<th>Favorite Music</th>` would be translated into the id `favoriteMusic`
         */
        id: string;
        /**
         * Function that returns the cell data to be written inside the cell
         *
         * @param record A data object representing the current line of data
         * @return The data for the current cell
         *
         * @example
         * function exampleAttributeWriter(record) {
         *     return record[this.id];
         * };
         */
        attributeWriter: (record: any) => any;
        /**
         * Function that interprets the cell html data in order to convert it into data
         *
         * @param cell A html node of the target cell
         * @param record A data object representing the current line of data
         * @return the html content for the current cell
         *
         * @example
         * function exampleAttributeReader(cell, record) {
         *     return $(cell).html();
         * };
         */
        attributeReader: (cell: Element, record: any) => string;
        /** List of ids for sorting, generated by the plugin, can be tweaked by using `data-dynatable-sorts` */
        sorts: Array<string>;
        hidden: boolean;
        /**
         * Detected internally by dynatable.
         * Possible values are:
         *
         * @enum('left', 'right', 'center', 'justify', 'initial', 'inherit')
         */
        textAlign: string;
    }
    interface Table {
        /**
         * By default, dynatable converts headings to JSON attribute names using:
         *
         * @enum('camelCase', 'trimDash', 'dashed', 'underscore', 'lowercase')
         * @default 'camelCase'
         * @see http://www.dynatable.com/#converting-attribute-names
         *
         * @example
         * // Given the html `<th>Favorite Music</th>` column header
         * // `camelCase` would translate it to id `favoriteMusic`
         * // `trimDash` would translate it to id `Favorite-Music`
         * // `dashed` would translate it to id `favorite-music`
         * // `underscore` would translate it to id `favorite_music`
         * // `lowercase` would translate it to id `favorite music`
         */
        defaultColumnIdStyle?: string;
        /** Generated internally by the plugin, will be reset by the DomColumns at init */
        columns?: Array<JQueryDynatable.Column>;
        /**
         * Selector used by dynatable in order to find the table header row
         *
         * @default 'thead tr'
         */
        headRowSelector?: string;
        /**
         * Selector used by dynatable in order to find the table body rows
         *
         * @default 'tbody tr'
         */
        bodyRowSelector?: string;
        /**
         * Optional classname that can be added by dynatable to the header cells
         *
         * @default null
         */
        headRowClass?: string;
    }
    interface Inputs {
        /**
         * Allows you to provide an array of jQuery objects which point to our filter inputs.
         * The inputs musts have a name attribute value matching a columnId in order to work.
         * Input values must strictly match the data from the cell...
         * Searching for "Lux" won't show "Luxembourg" event if it starts if the same letters!
         *
         * @default null
         * @see http://www.dynatable.com/#querying
         *
         * @example
         * $('#search-year')
         */
        queries?: JQuery;
        /**
         * @todo Find out how this `inputs.sorts` setting is useful + show an example
         * @default null
         * @see http://www.dynatable.com/#sorting
         */
        sorts?: any;
        /**
         * Allows you to define the accepted modifier keys to trigger a multisort action
         *
         * @default ['ctrlKey', 'shiftKey', 'metaKey']
         * @see https://en.wikipedia.org/wiki/Modifier_key
         */
        multisort?: Array<string>;
        /**
         * @todo Find out how this `inputs.page` setting is useful + show an example
         * @default null
         */
        page?: any;
        /**
         * The events attached to the search/filtering inputs elements
         *
         * @default 'blur change'
         */
        queryEvent?: string;
        /**
         * The jQuery object pointing to a target where to insert the recordCount html
         *
         * @default null
         *
         * @example
         * $('#chart-status-text')
         */
        recordCountTarget?: JQuery;
        /**
         * Determines where the recordCount is inserted
         *
         * @enum('before', 'after')
         * @default 'after'
         * @see http://api.jquery.com/category/manipulation/dom-insertion-outside/
         */
        recordCountPlacement?: string;
        /**
         * The target inside next to which the pagination block will be inserted (before or after).
         * You can use a selector string, an Element or a JQuery.
         *
         * @default null
         */
        paginationLinkTarget?: string|Element|JQuery;
        /**
         * Determines where the pagination links are inserted
         *
         * @enum('before', 'after')
         * @default 'after'
         * @see http://api.jquery.com/category/manipulation/dom-insertion-outside/
         */
        paginationLinkPlacement?: string;
        /**
         * The classname to be injected on the `<ul>` containing the pagination
         *
         * @default 'dynatable-pagination-links'
         */
        paginationClass?: string;
        /**
         * The classname to be injected on every pagination link
         *
         * @default 'dynatable-page-link'
         */
        paginationLinkClass?: string;
        /**
         * The classname to be injected on the previous page link
         *
         * @default 'dynatable-page-prev'
         */
        paginationPrevClass?: string;
        /**
         * The classname to be injected on the next page link
         *
         * @default 'dynatable-page-next'
         */
        paginationNextClass?: string;
        /**
         * The classname to be injected on the current page link
         *
         * @default 'dynatable-active-page'
         */
        paginationActiveClass?: string;
        /**
         * The classname to be injected on the disabled page links
         *
         * @default 'dynatable-disabled-page'
         */
        paginationDisabledClass?: string;
        /**
         * Text content for the previous page link
         *
         * @default 'Previous'
         */
        paginationPrev?: string;
        /**
         * Text content for the next page link
         *
         * @default 'Next'
         */
        paginationNext?: string;
        /**
         * Define the number of page number links shown inside the pagination
         *
         * @default [1,2,2,1]
         */
        paginationGap?: Array<number>;
        /**
         * The target next to which the search block will be inserted (before or after).
         * You can use a selector string, an Element or a JQuery.
         *
         * @default null
         */
        searchTarget?: string|Element|JQuery;
        /**
         * Determines where the search field is inserted
         *
         * @enum('before', 'after')
         * @default 'before'
         * @see http://api.jquery.com/category/manipulation/dom-insertion-outside/
         */
        searchPlacement?: string;
        /**
         * Text preceding the search field
         *
         * @default 'Search: '
         */
        searchText?: string;
        /**
         * The target next to which the per page pagination block will be inserted (before or after).
         * You can use a selector string, an Element or a jQuery object.
         *
         * @default null
         */
        perPageTarget?: string|Element|JQuery;
        /**
         * Determines where the perPage menu is inserted
         *
         * @enum('before', 'after')
         * @default 'before'
         * @see http://api.jquery.com/category/manipulation/dom-insertion-outside/
         */
        perPagePlacement?: string;
        /**
         * Text content preceding the items per page <select>
         *
         * @default 'Show: '
         */
        perPageText?: string;
        /**
         * Text content introducing the pagination
         *
         * @default 'Pages: '
         */
        pageText?: string;
        /**
         * Text content used inside the recordsCount
         *
         * @default '{pageLowerBound} to {pageUpperBound} of'
         */
        recordCountPageBoundTemplate?: string;
        /**
         * Text content used inside the recordsCount
         *
         * @default '{recordsShown} of'
         */
        recordCountPageUnboundedTemplate?: string;
        /**
         * Text content used inside the recordsCount
         *
         * @default '{recordsQueryCount} {collectionName}'
         */
        recordCountTotalTemplate?: string;
        /**
         * Text content used inside the recordsCount
         *
         * @default ' (filtered from {recordsTotal} total records)'
         */
        recordCountFilteredTemplate?: string;
        /**
         * Text content used inside the recordsCount
         *
         * @default 'Showing '
         */
        recordCountText?: string;
        /**
         * Text content used inside the recordsCount
         *
         * @default '{text} {pageTemplate} {totalTemplate} {filteredTemplate}'
         */
        recordCountTextTemplate?: string;
        /**
         * Text content used inside the recordsCount
         *
         * @default '<span id="dynatable-record-count-{elementId}" class="dynatable-record-count">{textTemplate}</span>'
         */
        recordCountTemplate?: string;
        /**
         * Text content injected inside the processingIndicator
         *
         * @default 'Processing...'
         */
        processingText?: string;
    }
    interface Dataset {
        /**
         * Enable the `ajax` mode
         *
         * @default false
         */
        ajax?: boolean;
        /**
         * A string containing the URL to which the request is sent.
         *
         * @default null
         */
        ajaxUrl?: string;
        /**
         * Defining the `cache` setting for the jQuery's ajax call...
         * true or false for dataType 'script' and 'jsonp'
         *
         * @default null
         * @see http://api.jquery.com/jQuery.ajax
         */
        ajaxCache?: boolean;
        /**
         * Send the ajax request automatically
         *
         * @default false
         */
        ajaxOnLoad?: boolean;
        /**
         * Defining the `method` setting for the jQuery's ajax call...
         * The HTTP method to use for the request (e.g. "POST", "GET", "PUT").
         *
         * @enum('GET', 'POST')
         * @default 'GET'
         * @todo Check if other methods could be used... ('GET', 'PUT', 'HEAD', 'POST', 'PATCH', 'TRACE', 'DELETE', 'CONNECT', 'OPTIONS', 'IS_AWARE', 'IS_EAGER', 'PROPFIND', 'IS_OPTIONAL', 'IS_REQUIRED', 'IS_CONSTRUCTOR', 'IS_INSTANTIATOR')
         */
        ajaxMethod?: string;
        /**
         * The type of data that you're expecting back from the server.
         * If none is specified, jQuery will try to infer it based on the MIME type of the response...
         *
         * @enum('xml', 'html', 'script', 'json', 'jsonp', 'text')
         * @default 'json'
         * @see http://api.jquery.com/jQuery.ajax
         */
        ajaxDataType?: string;
        /**
         * Name of the property in the dataset that contains the total number of records
         *
         * @default null
         */
        totalRecordCount?: string;
        /**
         * Object describing the current request's filtering
         *
         * @default {}
         */
        queries?: Object;
        /**
         * Name of the property in the dataset that contains the total number of records for the current query
         *
         * @default null
         */
        queryRecordCount?: string;
        /**
         * The page represented in the for the current dataset
         *
         * @default null
         */
        page?: number;
        /**
         * The default number of items loaded per page
         *
         * @default 10
         */
        perPageDefault?: number;
        /**
         * The default options available in the perPage menu built by dynatable
         *
         * @default [10,20,50,100]
         */
        perPageOptions?: Array<number>;
        /**
         * Object describing the current request's sorting
         *
         * @default {}
         */
        sorts?: Object;
        /**
         * The sorting keys (generated by dynatable)
         *
         * @default null
         */
        sortsKeys?: Array<string>;
        /**
         * The sorting types (generated by dynatable)
         * It will hosts the type of object to sort (string, number, etc.)
         *
         * @default {}
         */
        sortTypes?: Object;
        /**
         * The core data (generated or loaded by dynatable)
         *
         * @default null
         */
        records?: any;
    }
    interface Writers {
        /**
         * Function that write the data inside each row
         *
         * @param rowIndex The index of the current row (from 0 to the perPage value)
         * @param record A data object containing all the data for the current record (current line)
         * @param columns  An array of columns
         * @param cellWriter A reference to the function responsible for writing inside the cell
         * @return the data for the current cell
         *
         * @default defaultRowWriter
         *
         * @example
         * function exampleRowWriter(rowIndex, record, columns, cellWriter) {
         *     var tr = '';
         *     // grab the record's attribute for each column
         *     for (var i = 0, len = columns.length; i < len; i++) {
         *         tr += cellWriter(columns[i], record);
         *     }
         *     return '<tr>' + tr + '</tr>';
         * };
         */
        _rowWriter?: (rowIndex: number, record: any, columns: Array<Column>, cellWriter: Function) => string;
        /**
         * Function that returns the HTML code that will be injected for the cell
         *
         * @param column The column object describing the config for the current column
         * @param record A data object representing the current line of data
         * @return the data for the current cell
         *
         * @default defaultCellWriter
         *
         * @example
         * function exampleCellWriter(column, record) {
         *     var html = column.attributeWriter(record),
         *     td = '<td';
         *
         *     if (column.hidden || column.textAlign) {
         *         td += ' style="';
         *
         *         // keep cells for hidden column headers hidden
         *         if (column.hidden) {
         *             td += 'display: none;';
         *         }
         *
         *         // keep cells aligned as their column headers are aligned
         *         if (column.textAlign) {
         *             td += 'text-align: ' + column.textAlign + ';';
         *         }
         *
         *         td += '"';
         *     }
         *
         *     return td + '>' + html + '</td>';
         * };
         */
        _cellWriter?: (column: Column, record: any) => string;
        /**
         * Function that returns the cell data to be written inside the cell
         *
         * @param record A data object representing the current line of data
         * @return the data for the current cell
         *
         * @default defaultAttributeWriter
         *
         * @example
         * function exampleAttributeWriter(record) {
         *     // `this` is the column object in settings.columns
         *    return record[this.id];
         * };
         */
        _attributeWriter?: (record: any) => any;
    }
    interface Readers {
        /**
         * Function that interprets the row into data
         *
         * @param index The index of the current row (from 0 to the perPage value)
         * @param thisRef
         * @param record
         * @return the data for the current row
         *
         * @default null
         *
         * @example
         * function exampleRowReader(index, this, record) {
         *     //...
         * };
         */
        _rowReader?: (index: number, thisRef: any, record: any) => any;
        /**
         * Function that interprets the cell into data
         *
         * @param cell A html node of the target cell
         * @param record A data object representing the current line of data
         * @return the data for the current cell
         *
         * @default defaultAttributeReader
         *
         * @example
         * function exampleAttributeReader(cell, record) {
         *    return $(cell).html();
         * };
         */
        _attributeReader?: (cell: Element, record: any) => any;
    }
    interface Params {
        /**
         * @default 'dynatable'
         */
        dynatable?: string;
        /**
         * @default 'queries'
         */
        queries?: string;
        /**
         * @default 'sorts'
         */
        sorts?: string;
        /**
         * @default 'page'
         */
        page?: string;
        /**
         * @default 'perPage'
         */
        perPage?: string;
        /**
         * @default 'offset'
         */
        offset?: string;
        /**
         * @default 'records'
         */
        records?: string;
        /**
         * @default null
         */
        record?: Object;
        /**
         * @default 'queryRecordCount'
         */
        queryRecordCount?: string;
        /**
         * @default 'totalRecordCount'
         */
        totalRecordCount?: string;
    }
    interface Options {
        features?: Features;
        table?: Table;
        inputs?: Inputs;
        dataset?: Dataset;
        writers?: Writers;
        readers?: Readers;
        params?: Params;
    }
    interface DOM {
        /**
         * Manually update the dom with the current record set...
         * This can be useful after multiple calls to `domcolumns.add()` with `skipUpdate` set to true.
         * This way we improve performance by generating the DOM only once.
         */
        update(): void;
    }
    interface DOMColumns {
        /**
         * Add a new column at runtime
         *
         * @param $column A jQuery object containing the html markup for the `th`
         * @param position The position index indicating where we want to insert the new column
         * @param skipAppend A boolean allowing to skip the appending of the column header to table
         * @param skipUpdate A boolean allowing to skip the call to `dom.update()`
         */
        add($column: JQuery, position: number, skipAppend?: boolean, skipUpdate?: boolean): void;
        /**
         * Add several `data-` attributes on the provided `$cell`
         *
         * @param $cell A jQuery object pointing to the target cell
         * @return the modified jQuery object `$cell`
         */
        attachGeneratedAttributes($cell: JQuery): JQuery;
        /**
         * Generate a jQuery object if none is provided and decorate it by calling `attachGeneratedAttributes`
         *
         * @param $cell An optional jQuery object pointing to the target cell
         */
        generate($cell?: JQuery): JQuery;
        /**
         * Parse the table header row, analyse its cells and save the columns.
         *
         * @return Could return an `$.error()` if nothing is found.
         */
        getFromTable(): void|JQuery;
        /** Initializes `settings.table.columns` array and calls `getFromTable()` */
        init(): void;
        /**
         * Check if the `$element` is valid (if it is a `table`)
         *
         * @return A boolean
         */
        initOnLoad(): boolean;
        /**
         * Generate a jQuery object  if none is provided and decorate it by calling `attachGeneratedAttributes`
         *
         * @param columnIndexOrId A number (the column index) or a string (the column id)
         */
        remove(columnIndexOrId: number|string): void;
        /**
         * Remove the column from `settings.table.columns`
         *
         * @param index A number (the column index)
         */
        removeFromArray(index: number): void;
        /**
         * Remove the column from the DOM
         *
         * @param columnId A string matching the id used in `data-dynatable-column` attribute
         */
        removeFromTable(columnId: string): void;
    }
    interface InputsSearch {
        /** Inject the search form at the target location */
        attach(): void;
        /**
         * Build the html markup for the search form
         *
         * @return The jQuery object for the search form
         */
        create(): JQuery;
        /** Call the `attach()` method */
        init(): void;
        /**
         * Check if the search feature is enabled in `settings.features`
         *
         * @return A boolean
         */
        initOnLoad(): boolean;
    }
    interface PaginationLinks {
        /** Insert the pagination links inside the page */
        attach(): void;
        /**
         * Generate a string containing the html of a pagination link
         *
         * @param page The page number
         * @param label The text of the link (could be Previous, Next or a number)
         * @param linkClass The classname for the `<a>`
         * @param conditional Do we want to use the conditionalClass
         * @param conditionalClass The classname for both the `<li>` and its `<a>`
         * @return A string containing html markup
         */
        buildLink(page: number, label: string|number, linkClass: string, conditional: boolean, conditionalClass: string): string;
        /**
         * Build the `<ul>` and creates the event listeners
         *
         * @return A string containing html markup
         */
        create(): string;
        /** Call the attach method */
        init(): void;
        /**
         * Check if the paginate feature is enabled in `settings.features`
         *
         * @return A boolean
         */
        initOnLoad(): boolean;
    }
    interface PaginationPage {
        /** Parse the current window.location in order to determine the target page */
        init(): void;
        /**
         * Check if the paginate feature is enabled in `settings.features`
         *
         * @return A boolean
         */
        initOnLoad(): boolean;
        /**
         * Set the page in the dataset
         *
         * @param page The new page number
         */
        set(page: number): void;
    }
    interface PaginationPerPage {
        /** Insert the pagination per page inside the page */
        attach(): void;
        /**
         * Generate the html markup for the pagination per page
         *
         * @return A jQuery object containing the `<label>` and the `<select>`
         */
        create(): JQuery;
        /** Set up the pagination per page */
        init(): void;
        /**
         * Check if the paginate feature is enabled in `settings.features`
         *
         * @return A boolean
         */
        initOnLoad(): boolean;
        /**
         * Set the new value for the pagination per page
         *
         * @param number The new number of items visible per page
         * @param skipResetPage By default (false) it sends you to page 1
         */
        set(number: number, skipResetPage?: boolean): void;
    }
    interface ProcessingIndicator {
        /** Insert the processing indicator inside the page */
        attach(): void;
        /**
         * Generate the html markup for the processing indicator
         *
         * @return A jQuery object containing the generated html
         */
        create(): JQuery;
        /** Hide the processing indicator */
        hide(): void;
        /** Set up the processing indicator */
        init(): void;
        /**
         * Position the processing indicator at the center
         *
         * @return A jQuery object containing the processing indicator
         */
        position(): JQuery;
        /** Show the processing indicator */
        show(): void;
    }
    interface Queries {
        /**
         * Add a new condition in the queries
         *
         * @param name The key for for the query
         * @param value The value we wish to find
         * @return A reference to the related Dynatable object
         */
        add(name: string, value: any): Dynatable;
        /** functions object for Queries */
        functions: QueriesFunctions;
        /** Set up the initial search parameters */
        init(): void;
        /**
         * Check if search feature is enabled
         *
         * @return A boolean if search feature is enabled
         */
        initOnLoad(): boolean;
        /**
         * Remove the query from the dataset
         *
         * @param name The key for for the query to be removed
         * @return A reference to the related Dynatable object
         */
        remove(name: string): Dynatable;
        /**  Run a search with all the saved queries */
        run(): any;
        /**
         * Shortcut for performing simple query from built-in search
         *
         * @param q The value that will be searched for
         */
        runSearch(q: any): void;
        /** Set up the input fields for creating queries */
        setupInputs(): void;
    }
    interface QueriesFunctions {
        /**
         * Search in all of the properties of the provided single record
         *
         * @param record A data object with all the properties of the current line
         * @param queryValue The researched value
         * @return A boolean indicating if a match was found
         */
        search(record: any, queryValue: string): boolean;
    }
    interface Records {
        /**
         * Count records from table
         *
         * @return The length of the records Array
         */
        count(): number;
        /**
         * Get initial recordset to populate table
         * if ajax, call ajaxUrl
         * otherwise, initialize from in-table records
         *
         * @return An Array with the records
         */
        getFromTable(): Array<Object>;
        /** Create and init the records */
        init(): void;
        /**
         * Check if ajax feature is enabled
         *
         * @return A boolean if ajax feature is enabled
         */
        initOnLoad(): boolean;
        /**
         * Get the first and the last indexes based on current page and number of items per page
         *
         * @return An Array with the first index ([0]) and the last index ([1])
         */
        pageBounds(): Array<number>;
        /** Update the records with the new page */
        paginate(): void;
        /** Reset the records */
        resetOriginal(): void;
        /**
         * Call the appropriated sort function
         *
         * @return The number (-1, 0 or +1) representing the comparison
         */
        sort(): number;
        /**
         * Merge ajax response json with cached data including (meta-data and records)
         *
         * @param data The new data
         */
        updateFromJson(data: any): void;
    }
    interface RecordsCount {
        /** Insert the record count inside the page */
        attach(): void;
        /**
         * Generate the html markup for the record count
         *
         * @return A jQuery object containing the generated html
         */
        create(): JQuery;
        /** Create and init the records count */
        init(): void;
        /**
         * Check if recordCount feature is enabled
         *
         * @return A boolean if recordCount feature is enabled
         */
        initOnLoad(): boolean;
    }
    interface Settings {
        dataset: Dataset;
        features: Features;
        inputs: Inputs;
        params: Params;
        readers: Readers;
        table: Table;
        writers: Writers;
    }
    interface Sorts {
        /**
         * Add a new sort in sortKeys
         *
         * @param attr The key for for the sorting
         * @param direction The sorting direction (-1 or +1)
         * @return A reference to the related Dynatable object
         */
        add(attr: string, direction: number): Dynatable;
        /** Remove all the sortKeys */
        clear(): void;
        /** functions object for Sorts */
        functions: SortsFunctions;
        /**
         * Try to intelligently guess which sort function to use based on the type of attribute values.
         *
         * @param a The first record
         * @param b The second record
         * @param attr The key of the property
         * @return A string containing one of the types ('string' or 'number')
         */
        guessType(a: any, b: any, attr: string): string;
        /** Create and init the sorts */
        init(): void;
        /**
         * Check if sort feature is enabled
         *
         * @return A boolean if sort feature is enabled
         */
        initOnLoad(): boolean;
        /**
         * Remove a sort attribute from the sortKeys
         *
         * @param attr The key to be removed from the sorting
         * @return A reference to the related Dynatable object
         */
        remove(attr: string): Dynatable;
    }
    interface SortsFunctions {
        /**
         * Sorting between 2 numbers
         *
         * @param a The first record
         * @param b The second record
         * @param attr The key of the property
         * @param direction The number describingthe order: ASC (+1), DESC (-1) or none (0)
         * @return The number (-1, 0 or +1) representing the comparison
         */
        number(a: any, b: any, attr: string, direction: number): number;
        /**
         * Restores the original order we had...
         *
         * @param a The first record
         * @param b The second record
         * @return The number (-1, 0 or +1) representing the comparison
         */
        originalPlacement(a: any, b: any): number;
        /**
         * Sorting between 2 strings
         *
         * @param a The first record
         * @param b The second record
         * @param attr The key of the property
         * @param direction The number describingthe order: ASC (+1), DESC (-1) or none (0)
         * @return The number (-1, 0 or +1) representing the comparison
         */
        string(a: any, b: any, attr: string, direction: number): number;
    }
    interface SortsHeaders {
        /**
         * Inject the arrow down inside the $link
         *
         * @param $link The jQuery object to be used
         */
        appendArrowDown($link: JQuery): void;
        /**
         * Inject the arrow up inside the $link
         *
         * @param $link The jQuery object to be used
         */
        appendArrowUp($link: JQuery): void;
        /** Go through each cell and call `attachOne` */
        attach(): void;
        /**
         * If sorting is allowed for the provided cell, it injects the hml generated by `create`
         *
         * @param cell The cell Element to be parsed
         */
        attachOne(cell: Element): void;
        /**
         * Generate the html markup to be inserted inside the header of the sortable column
         *
         * @param cell An Element which point to the cell in the header row
         * @return A jQuery object containing the markup of the link
         */
        create(cell: Element): JQuery;
        /** Create and init the sorts */
        init(): void;
        /**
         * Check if sort feature is enabled
         *
         * @return A boolean if sort feature is enabled
         */
        initOnLoad(): boolean;
        /** Remove all the sort headers from the table */
        removeAll(): void;
        /** Remove all arrows Elements from the table */
        removeAllArrows(): void;
        /**
         * Remove the arrow found inside the provided $link
         *
         * @param $link The jQuery object containing the `<a>` markup in the sortable headers
         */
        removeArrow($link: JQuery): void;
        /**
         * Remove the link generated by dynatable inside the sortable header
         * and restore its original html content
         *
         * @param cell The cell Element that will be parsed
         */
        removeOne(cell: Element): void;
        /**
         * @todo learn more about this method and document it
         *
         * @param $link The jQuery object to be used
         * @param column The Column object that will be used
         * @return A boolean which is true if supplied test function passes for ALL items in an array
         */
        sortedByColumn($link: JQuery, column: Column): boolean;
        /**
         * Inspect the settings to determine the order to use
         *
         * @param column The Column object that will be used
         * @return A number (-1 or +1) describing the order to use (DESC or ASC)
         */
        sortedByColumnValue(column: Column): number;
        /**
         * Refresh the [multi] sorting of the dataset
         *
         * @param $e The event object (of the click on the table sortable header)
         * @param $link The header link
         * @param column The Column object to be sorted
         */
        toggleSort(e: Event, $link: JQuery, column: Column): void;
    }
    interface State {
        /** Set up a listener for popstate event on window */
        init(): void;
        /**
         * Check if pushState option is true, and if browser supports it
         *
         * @return A boolean
         */
        initOnLoad(): boolean;
        /**
         * Handler for the popstate event
         *
         * @param event The native popstate event
         */
        pop(event: Event): void;
        /**
         * Update the URL data using pushState
         *
         * @param data An object with the parameters we want to push
         */
        push(data: Object): void;
    }
    interface Dynatable {
        /**
        * Initialize Dynatable plugin
        *
        * @param options An optional object that allow you to change the default configuration options
        */
        (options?: Options): JQuery;
        /**
         * Each dynatable instance inherits from this,
         * set properties specific to instance
         *
         * @param element The html node to be used by dynatable
         * @param options The JQueryDynatable.Options object which contains all the settings
         * @return A reference to the current and brand new dynatable object
         */
        init(element: Element, options: Options): Dynatable;
        /**
         * Call the process method on all the components of this dynatable
         *
         * @param skipPushState A boolean allowing to skip the update the query string in the URL
         */
        process(skipPushState?: boolean): void;
        /** The `element` encapsulated inside a jQuery object */
        $element: JQuery;
        /** The `dom` API */
        dom: DOM;
        /** The `domColumns` API */
        domColumns: DOMColumns;
        /** The native element on which the dynatable plugin was called */
        element: Element
        /** The `inputsSearch` API */
        inputsSearch: InputsSearch;
        /** The `paginationLinks` API */
        paginationLinks: PaginationLinks;
        /** The `paginationPage` API */
        paginationPage: PaginationPage;
        /** The `paginationPerPage` API */
        paginationPerPage: PaginationPerPage;
        /** The `processingIndicator` API */
        processingIndicator: ProcessingIndicator;
        /** The `queries` API */
        queries: Queries;
        /** The `records` API */
        records: Records;
        /** The `recordsCount` API */
        recordsCount: RecordsCount;
        /** The `settings` API */
        settings: Settings;
        /** The `sorts` API */
        sorts: Sorts;
        /** The `sortsHeaders` API */
        sortsHeaders: SortsHeaders;
        /** The `state` API */
        state: State;
    }
}

//declare var dynatable: JQueryDynatable.Dynatable;
