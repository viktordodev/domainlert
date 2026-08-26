"use client";

import { useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries";
import { format } from "@/utils/i18n";
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

type DomainListCopy = {
  list: Dictionary["dashboard"]["list"];
  deleteDialog: Dictionary["dashboard"]["deleteDialog"];
  alertsDialog: Dictionary["dashboard"]["alertsDialog"];
};

type DomainListProps = {
  domains: Domain[];
  deleteAction: (formData: FormData) => Promise<void>;
  alertsAction: (formData: FormData) => Promise<void>;
  defaultThresholds: number[];
  copy: DomainListCopy;
};

type SortOption = "az" | "za" | "active";
type PageSize = 10 | 25 | 100;

export function DomainList({ domains, deleteAction, alertsAction, defaultThresholds, copy }: DomainListProps) {
  const { list } = copy;
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

  const statusLabel = (status: string) =>
    list.status[status as keyof typeof list.status] ?? status.replace("_", " ");

  return (
    <>
      <div className={styles.listControls} ref={listTopRef}>
        <label className={styles.searchField} htmlFor="domainSearch">
          <span>{list.searchLabel}</span>
          <input
            id="domainSearch"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={list.searchPlaceholder}
          />
        </label>
        <label className={styles.sortField} htmlFor="domainSort">
          <span>{list.sortLabel}</span>
          <select
            id="domainSort"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as SortOption);
              setPage(1);
            }}
          >
            <option value="az">{list.sortAz}</option>
            <option value="za">{list.sortZa}</option>
            <option value="active">{list.sortActive}</option>
          </select>
        </label>
        <label className={styles.pageSizeField} htmlFor="domainPageSize">
          <span>{list.perPageLabel}</span>
          <select
            id="domainPageSize"
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value) as PageSize);
              setPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <div className={styles.listHeader} aria-hidden="true">
        <span></span>
        <span>{list.headerDomain}</span>
        <span>{list.headerExpiry}</span>
        <span>{list.headerStatus}</span>
        <span>{list.headerAlerts}</span>
        <span>{list.headerActions}</span>
      </div>
      <div className={styles.cardRows} key={currentPage}>
        {paginatedDomains.length ? (
          paginatedDomains.map((domain) => {
            const warn = domain.status === "expiring_soon" || domain.status === "not_registered";
            return (
              <div className={`${styles.cardRow} ${warn ? styles.warning : ""}`} key={domain.id}>
                <span className={warn ? styles.statusWarn : styles.statusGood}></span>
                <strong>{domain.domain_name}</strong>
                <span>
                  {domain.status === "not_registered"
                    ? list.notRegistered
                    : domain.expiry_date ?? list.expiryPending}
                </span>
                <small>{statusLabel(domain.status)}</small>
                <span className={styles.alertSetting}>
                  {domain.alert_thresholds?.length
                    ? format(list.customThresholds, { values: domain.alert_thresholds.join(", ") })
                    : list.defaultThresholds}
                </span>
                <div className={styles.rowActions}>
                  <DomainAlertsDialog
                    action={alertsAction}
                    domainId={domain.id}
                    domainName={domain.domain_name}
                    customThresholds={domain.alert_thresholds}
                    customRecipients={domain.alert_recipients}
                    defaultThresholds={defaultThresholds}
                    copy={copy.alertsDialog}
                  />
                  <DeleteDomainDialog
                    action={deleteAction}
                    domainId={domain.id}
                    domainName={domain.domain_name}
                    copy={copy.deleteDialog}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.cardEmpty}>{query ? list.emptySearch : list.emptyList}</div>
        )}
      </div>
      {visibleDomains.length > 0 && (
        <div className={styles.pagination}>
          <span>
            {format(list.paginationRange, {
              from: firstVisible,
              to: lastVisible,
              total: visibleDomains.length,
            })}
          </span>
          <div className={styles.paginationActions}>
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label={list.previousPage}
            >
              {list.previous}
            </button>
            <span>{format(list.pageXofY, { page: currentPage, pages: pageCount })}</span>
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              aria-label={list.nextPage}
            >
              {list.next}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
