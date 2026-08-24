"use client";

import { useMemo, useRef, useState } from "react";
import { DeleteDomainDialog } from "./DeleteDomainDialog";
import { DomainAlertsDialog } from "./DomainAlertsDialog";
import styles from "./dashboard.module.css";

type Domain = {
  id: string;
  domain_name: string;
  status: string;
  expiry_date: string | null;
  alert_thresholds: number[] | null;
  alert_recipients: string[] | null;
};

type DomainListProps = {
  domains: Domain[];
  deleteAction: (formData: FormData) => Promise<void>;
  alertsAction: (formData: FormData) => Promise<void>;
  defaultThresholds: number[];
};

type SortOption = "az" | "za" | "active";
type PageSize = 10 | 25 | 100;

export function DomainList({ domains, deleteAction, alertsAction, defaultThresholds }: DomainListProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("az");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(10);
  const listTopRef = useRef<HTMLDivElement>(null);

  const visibleDomains = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = domains.filter((domain) => domain.domain_name.toLowerCase().includes(normalizedQuery));

    return [...filtered].sort((left, right) => {
      if (sort === "active") {
        const activeDifference = Number(right.status === "active") - Number(left.status === "active");
        if (activeDifference !== 0) return activeDifference;
      }

      return sort === "za"
        ? right.domain_name.localeCompare(left.domain_name)
        : left.domain_name.localeCompare(right.domain_name);
    });
  }, [domains, query, sort]);

  const pageCount = Math.max(1, Math.ceil(visibleDomains.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paginatedDomains = visibleDomains.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const firstVisible = visibleDomains.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastVisible = Math.min(currentPage * pageSize, visibleDomains.length);

  const goToPage = (pageNumber: number) => {
    setPage(Math.max(1, Math.min(pageNumber, pageCount)));
    window.requestAnimationFrame(() => {
      const listTop = listTopRef.current;
      if (!listTop) return;

      const top = listTop.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  return (
    <>
      <div className={styles.listControls} ref={listTopRef}>
        <label className={styles.searchField} htmlFor="domainSearch">
          <span>Search domains</span>
          <input
            id="domainSearch"
            type="search"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setPage(1); }}
            placeholder="Find a domain"
          />
        </label>
        <label className={styles.sortField} htmlFor="domainSort">
          <span>Sort by</span>
          <select id="domainSort" value={sort} onChange={(event) => { setSort(event.target.value as SortOption); setPage(1); }}>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="active">Active</option>
          </select>
        </label>
        <label className={styles.pageSizeField} htmlFor="domainPageSize">
          <span>Show per page</span>
          <select id="domainPageSize" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value) as PageSize); setPage(1); }}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <div className={styles.listHeader} aria-hidden="true">
        <span></span>
        <span>Domain</span>
        <span>Expiry</span>
        <span>Status</span>
        <span>Alert schedule</span>
        <span>Actions</span>
      </div>
      <div className={styles.cardRows} key={currentPage}>
        {paginatedDomains.length ? paginatedDomains.map((domain) => (
          <div className={`${styles.cardRow} ${domain.status === "expiring_soon" ? styles.warning : ""}`} key={domain.id}>
            <span className={domain.status === "expiring_soon" ? styles.statusWarn : styles.statusGood}></span>
            <strong>{domain.domain_name}</strong>
            <span>{domain.expiry_date ?? "Expiry check pending"}</span>
            <small>{domain.status.replace("_", " ")}</small>
            <span className={styles.alertSetting}>{domain.alert_thresholds?.length ? `Custom: ${domain.alert_thresholds.join(", ")}` : "Default thresholds"}</span>
            <div className={styles.rowActions}>
              <DomainAlertsDialog action={alertsAction} domainId={domain.id} domainName={domain.domain_name} customThresholds={domain.alert_thresholds} customRecipients={domain.alert_recipients} defaultThresholds={defaultThresholds} />
              <DeleteDomainDialog action={deleteAction} domainId={domain.id} domainName={domain.domain_name} />
            </div>
          </div>
        )) : <div className={styles.cardEmpty}>{query ? "No domains match your search." : "Your first domains will appear here."}</div>}
      </div>
      {visibleDomains.length > 0 && <div className={styles.pagination}>
        <span>{firstVisible}-{lastVisible} of {visibleDomains.length}</span>
        <div className={styles.paginationActions}>
          <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">Previous</button>
          <span>Page {currentPage} of {pageCount}</span>
          <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageCount} aria-label="Next page">Next</button>
        </div>
      </div>}
    </>
  );
}