import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    getVendorSyncCatalog,
    getTamilNaduWeddingSearchPlan,
    syncGoogleWeddingVendors,
} from '../../services/vendorService';

const VendorSyncConsole = () => {
    const { user } = useAuth();
    const [catalog, setCatalog] = useState(null);
    const [selectedFocusKeys, setSelectedFocusKeys] = useState([]);
    const [districtInput, setDistrictInput] = useState('');
    const [includeBroadKeywords, setIncludeBroadKeywords] = useState(false);
    const [maxQueries, setMaxQueries] = useState(250);
    const [maxResultsPerQuery, setMaxResultsPerQuery] = useState(8);

    const [loadingCatalog, setLoadingCatalog] = useState(false);
    const [loadingPlan, setLoadingPlan] = useState(false);
    const [loadingDryRun, setLoadingDryRun] = useState(false);
    const [loadingSync, setLoadingSync] = useState(false);

    const [planResult, setPlanResult] = useState(null);
    const [syncResult, setSyncResult] = useState(null);
    const [error, setError] = useState('');

    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        if (!isAdmin) return;

        const loadCatalog = async () => {
            try {
                setLoadingCatalog(true);
                const response = await getVendorSyncCatalog();
                if (response?.success) {
                    setCatalog(response.data);
                    setSelectedFocusKeys(response.data.defaultFocusKeys || []);
                }
            } catch (err) {
                setError(err?.response?.data?.message || 'Failed to load vendor sync catalog');
            } finally {
                setLoadingCatalog(false);
            }
        };

        loadCatalog();
    }, [isAdmin]);

    const selectedDistricts = useMemo(() => {
        return districtInput
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);
    }, [districtInput]);

    const toggleFocusKey = (key) => {
        setSelectedFocusKeys((prev) => {
            if (prev.includes(key)) return prev.filter((item) => item !== key);
            return [...prev, key];
        });
    };

    const buildPayload = () => ({
        focusKeys: selectedFocusKeys,
        districts: selectedDistricts,
        includeBroadKeywords,
        maxQueries: Number(maxQueries),
        maxResultsPerQuery: Number(maxResultsPerQuery),
    });

    const handlePreviewPlan = async () => {
        try {
            setError('');
            setLoadingPlan(true);

            const response = await getTamilNaduWeddingSearchPlan({
                focusKeys: selectedFocusKeys.join(','),
                districts: selectedDistricts.join(','),
                includeBroadKeywords,
                maxQueries: Number(maxQueries),
            });

            if (response?.success) {
                setPlanResult(response.data);
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to preview search plan');
        } finally {
            setLoadingPlan(false);
        }
    };

    const handleDryRun = async () => {
        try {
            setError('');
            setLoadingDryRun(true);
            const response = await syncGoogleWeddingVendors({
                ...buildPayload(),
                dryRun: true,
            });
            if (response?.success) {
                setSyncResult(response.data);
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Dry run failed');
        } finally {
            setLoadingDryRun(false);
        }
    };

    const handleSync = async () => {
        const shouldProceed = window.confirm('Run live sync? This will insert or update vendors in the database.');
        if (!shouldProceed) return;

        try {
            setError('');
            setLoadingSync(true);
            const response = await syncGoogleWeddingVendors({
                ...buildPayload(),
                dryRun: false,
            });
            if (response?.success) {
                setSyncResult(response.data);
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Live sync failed');
        } finally {
            setLoadingSync(false);
        }
    };

    if (!isAdmin) return null;

    return (
        <section className="max-w-[1440px] w-full mx-auto px-6 lg:px-10 pt-6">
            <div className="rounded-xl border border-lux-gold/20 bg-lux-navy-light/70 backdrop-blur p-6">
                <div className="flex flex-col gap-1 mb-5">
                    <h2 className="text-2xl text-lux-pale tracking-tight">Tamil Nadu Vendor Sync Console</h2>
                    <p className="text-lux-pale/60 text-sm">
                        Build district/city/town wedding searches and sync Google results for photography and wedding cards.
                    </p>
                </div>

                {loadingCatalog ? (
                    <p className="text-lux-pale/70 text-sm">Loading sync catalog...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                            <div className="xl:col-span-2 rounded-lg border border-lux-gold/15 p-4">
                                <p className="text-xs uppercase tracking-widest text-lux-pale/50 mb-3">Focus Categories</p>
                                <div className="flex flex-wrap gap-2">
                                    {(catalog?.focusGroups || []).map((group) => {
                                        const active = selectedFocusKeys.includes(group.key);
                                        return (
                                            <button
                                                key={group.key}
                                                type="button"
                                                onClick={() => toggleFocusKey(group.key)}
                                                className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${active ? 'border-lux-gold bg-lux-gold/20 text-lux-pale' : 'border-lux-pale/20 text-lux-pale/60 hover:text-lux-pale hover:border-lux-gold/40'}`}
                                            >
                                                {group.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rounded-lg border border-lux-gold/15 p-4 space-y-3">
                                <label className="block">
                                    <span className="text-xs uppercase tracking-widest text-lux-pale/50">Max Queries</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={maxQueries}
                                        onChange={(e) => setMaxQueries(e.target.value)}
                                        className="mt-1 w-full h-10 rounded bg-lux-navy border border-lux-gold/20 text-lux-pale px-3"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-xs uppercase tracking-widest text-lux-pale/50">Max Results / Query</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={maxResultsPerQuery}
                                        onChange={(e) => setMaxResultsPerQuery(e.target.value)}
                                        className="mt-1 w-full h-10 rounded bg-lux-navy border border-lux-gold/20 text-lux-pale px-3"
                                    />
                                </label>
                                <label className="inline-flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeBroadKeywords}
                                        onChange={(e) => setIncludeBroadKeywords(e.target.checked)}
                                        className="size-4 rounded border-lux-gold/40 bg-lux-navy text-lux-gold"
                                    />
                                    <span className="text-sm text-lux-pale/70">Include broad wedding services</span>
                                </label>
                            </div>
                        </div>

                        <div className="mt-4 rounded-lg border border-lux-gold/15 p-4">
                            <label className="block">
                                <span className="text-xs uppercase tracking-widest text-lux-pale/50">District Filter (optional)</span>
                                <input
                                    type="text"
                                    value={districtInput}
                                    onChange={(e) => setDistrictInput(e.target.value)}
                                    placeholder="Leave empty for all Tamil Nadu districts, or enter comma-separated values"
                                    className="mt-1 w-full h-10 rounded bg-lux-navy border border-lux-gold/20 text-lux-pale px-3"
                                />
                            </label>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handlePreviewPlan}
                                disabled={loadingPlan}
                                className="px-4 py-2 rounded border border-lux-pale/30 text-lux-pale hover:border-lux-gold disabled:opacity-60"
                            >
                                {loadingPlan ? 'Previewing...' : 'Preview Search Plan'}
                            </button>
                            <button
                                type="button"
                                onClick={handleDryRun}
                                disabled={loadingDryRun}
                                className="px-4 py-2 rounded border border-lux-gold/40 text-lux-gold hover:bg-lux-gold/15 disabled:opacity-60"
                            >
                                {loadingDryRun ? 'Running Dry Run...' : 'Dry Run Sync'}
                            </button>
                            <button
                                type="button"
                                onClick={handleSync}
                                disabled={loadingSync}
                                className="px-4 py-2 rounded bg-lux-gold text-white hover:bg-lux-gold/80 disabled:opacity-60"
                            >
                                {loadingSync ? 'Syncing...' : 'Run Live Sync'}
                            </button>
                        </div>
                    </>
                )}

                {error ? (
                    <div className="mt-4 rounded border border-red-400/40 bg-red-900/20 p-3 text-sm text-red-200">{error}</div>
                ) : null}

                {planResult ? (
                    <div className="mt-5 rounded-lg border border-lux-gold/15 p-4">
                        <h3 className="text-lux-pale text-base mb-2">Plan Preview</h3>
                        <p className="text-sm text-lux-pale/70 mb-3">
                            Total Queries: {planResult.totalQueries} | Districts Covered: {planResult.districtsCovered}
                        </p>
                        <div className="max-h-48 overflow-y-auto space-y-1 text-xs text-lux-pale/60">
                            {(planResult.queries || []).slice(0, 20).map((query, index) => (
                                <p key={`${query.queryText}-${index}`}>{query.queryText}</p>
                            ))}
                        </div>
                    </div>
                ) : null}

                {syncResult ? (
                    <div className="mt-5 rounded-lg border border-lux-gold/15 p-4">
                        <h3 className="text-lux-pale text-base mb-2">Sync Result</h3>
                        <p className="text-sm text-lux-pale/70">Planned Queries: {syncResult.totalPlannedQueries}</p>
                        <p className="text-sm text-lux-pale/70">Queries Processed: {syncResult.queriesProcessed}</p>
                        <p className="text-sm text-lux-pale/70">Unique Candidates: {syncResult.uniqueCandidates}</p>
                        {'created' in syncResult ? <p className="text-sm text-lux-pale/70">Created: {syncResult.created}</p> : null}
                        {'updated' in syncResult ? <p className="text-sm text-lux-pale/70">Updated: {syncResult.updated}</p> : null}
                        {'failed' in syncResult ? <p className="text-sm text-lux-pale/70">Failed: {syncResult.failed}</p> : null}
                        {syncResult.dryRun ? <p className="text-sm text-lux-gold mt-1">Dry run only. No database writes were made.</p> : null}
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default VendorSyncConsole;
