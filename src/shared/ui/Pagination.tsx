import React, { useMemo } from "react";

interface props {
	totalCount: number;
	currPageNumber: React.MutableRefObject<number>;
	routerCb: (page: number) => void;
	limit: number;
	// setCurrPageNumber: React.Dispatch<React.SetStateAction<number>>;
}
const DOTS = "...";
// 1 ... 3 4 5 ... 7
// 1 2 3 4 5
// first ... nums ... last ? curr >= 3
export default function Pagination({
	totalCount,
	currPageNumber,
	routerCb,
	limit,
}: // setCurrPageNumber,
props): JSX.Element {
	const totalPages = useMemo(
		() => Math.ceil(totalCount / limit),
		[totalCount, limit]
	);
	const pages = [];
	// checking total amount of pages visible
	const visiblePages = totalPages >= 5 ? 5 : totalPages;

	// if current page is less than 3 then show up to 5 pages
	if (currPageNumber.current <= 3) {
		for (let i = 1; i <= visiblePages; i++) {
			pages.push(i);
		}
	} else if (totalPages - 3 <= currPageNumber.current) {
		// go only up to the last page but show 5 total pages
		for (let i = totalPages - 4; i <= totalPages; i++) {
			pages.push(i);
		}
	} else {
		// use the current page as the middle point
		for (
			let i = currPageNumber.current - 2;
			i <= currPageNumber.current + 2;
			i++
		) {
			pages.push(i);
		}
	}

	return (
		<PaginationWrapper
			currentPageNumber={currPageNumber.current}
			routerCb={routerCb}
			totalPages={totalPages}
		>
			{pages.map((page) => {
				if (currPageNumber.current === page) {
					return (
						<button
							key={page}
							className="active"
							onClick={() => {
								routerCb(page - 1);
							}}
						>
							{page}
						</button>
					);
				} else {
					return (
						<button
							key={page}
							onClick={() => {
								routerCb(page - 1);
							}}
						>
							{page}
						</button>
					);
				}
			})}
		</PaginationWrapper>
	);
}

interface PaginationWrapperProps {
	children: React.ReactNode;
	currentPageNumber: number;
	routerCb: (val: number) => void;
	totalPages: number;
}
function PaginationWrapper({
	children,
	currentPageNumber,
	routerCb,
	totalPages,
}: PaginationWrapperProps): JSX.Element {
	return (
		<div>
			<button
				disabled={currentPageNumber === 1}
				onClick={() => {
					routerCb(0);
				}}
			>
				First
			</button>
			{currentPageNumber > 3 ? <button>{DOTS}</button> : null}
			{children}
			{currentPageNumber + 3 < totalPages ? <button>{DOTS}</button> : null}
			<button
				disabled={currentPageNumber === totalPages}
				onClick={() => {
					routerCb(totalPages - 1);
				}}
			>
				Last
			</button>
		</div>
	);
}
