import React, { useMemo, useState } from "react";

interface props {
	totalCount: number;
	currPageNumber: number;
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
	if (currPageNumber <= 3) {
		for (let i = 1; i <= visiblePages; i++) {
			pages.push(i);
		}
	} else if (totalPages - 3 <= currPageNumber) {
		// go only up to the last page but show 5 total pages
		for (let i = totalPages - 4; i <= totalPages; i++) {
			pages.push(i);
		}
	} else {
		// use the current page as the middle point
		for (let i = currPageNumber - 2; i <= currPageNumber + 2; i++) {
			pages.push(i);
		}
	}

	return (
		<PaginationWrapper
			currentPageNumber={currPageNumber}
			routerCb={routerCb}
			totalPages={totalPages}
		>
			{pages.map((page) => {
				if (currPageNumber === page) {
					return (
						<button
							key={page}
							className="rounded-md px-2 py-1 hover:outline hover:outline-2 hover:outline-secondary"
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
							className="rounded-md px-2 py-1 hover:outline hover:outline-2 hover:outline-secondary"
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
	const [firstBtnDisabled, setFirstBtnDisabled] = useState(false);
	const [lastBtnDisabled, setLastBtnDisabled] = useState(false);
	return (
		<div className="my-6 flex justify-center gap-4">
			<button
				className={`rounded-md px-2 py-1 hover:outline hover:outline-2 hover:outline-secondary ${
					firstBtnDisabled ? "" : ""
				}`}
				disabled={firstBtnDisabled}
				onClick={() => {
					routerCb(0);
				}}
			>
				First
			</button>
			{currentPageNumber > 3 ? <button disabled>{DOTS}</button> : null}
			{children}
			{currentPageNumber + 3 < totalPages ? (
				<button disabled>{DOTS}</button>
			) : null}
			<button
				className={`rounded-md px-2 py-1 hover:outline hover:outline-2 hover:outline-secondary ${
					lastBtnDisabled ? "text-red-500" : ""
				}`}
				disabled={lastBtnDisabled}
				onClick={() => {
					routerCb(totalPages - 1);
				}}
			>
				Last
			</button>
		</div>
	);
	function toggleDisableFirstBtn(): boolean {
		if (currentPageNumber === 1) {
			setFirstBtnDisabled(true);
			return true;
		} else {
			setFirstBtnDisabled(false);
			return false;
		}
	}

	function toggleDisableLastBtn(): boolean {
		if (currentPageNumber === totalPages) {
			setLastBtnDisabled(true);
			return true;
		} else {
			setLastBtnDisabled(false);
			return false;
		}
	}
}
