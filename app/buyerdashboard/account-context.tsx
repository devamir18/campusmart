"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type BuyerProfile = {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  photoDataUrl: string | null;
};

export type BuyerAddress = {
  id: string;
  address: string;
  area: string;
  isDefault: boolean;
};

export type BuyerAccountData = {
  profile: BuyerProfile;
  addresses: BuyerAddress[];
  notifications: {
    orderUpdates: boolean;
    marketplaceNews: boolean;
  };
};

type BuyerAccountContextValue = {
  account: BuyerAccountData;
  isLoaded: boolean;
  storageMessage: string;
  updateAccount: (account: BuyerAccountData) => void;
  saveAccount: (account: BuyerAccountData) => boolean;
};

const STORAGE_KEY = "campus-marketplace-buyer-account";
const STORAGE_VERSION = 1;

const DEFAULT_ACCOUNT: BuyerAccountData = {
  profile: {
    fullName: "Alex Bright",
    email: "alex@campus.edu",
    phone: "",
    school: "",
    photoDataUrl: null,
  },
  addresses: [
    {
      id: "address-default",
      address: "Block C, Room 214",
      area: "Main campus hostel",
      isDefault: true,
    },
    {
      id: "address-secondary",
      address: "Block A, Room 105",
      area: "Main campus hostel",
      isDefault: false,
    },
  ],
  notifications: {
    orderUpdates: true,
    marketplaceNews: false,
  },
};

const BuyerAccountContext =
  createContext<BuyerAccountContextValue | null>(null);

type BuyerAccountSnapshot = {
  account: BuyerAccountData;
  isLoaded: boolean;
  storageMessage: string;
};

const SERVER_SNAPSHOT: BuyerAccountSnapshot = {
  account: DEFAULT_ACCOUNT,
  isLoaded: false,
  storageMessage: "",
};

let snapshot = SERVER_SNAPSHOT;
let hasLoadedAccount = false;
const listeners = new Set<() => void>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBuyerAccountData(value: unknown): value is BuyerAccountData {
  if (!isRecord(value) || !isRecord(value.profile) || !isRecord(value.notifications)) {
    return false;
  }

  const { profile, notifications, addresses } = value;
  return (
    typeof profile.fullName === "string" &&
    typeof profile.email === "string" &&
    typeof profile.phone === "string" &&
    typeof profile.school === "string" &&
    (typeof profile.photoDataUrl === "string" ||
      profile.photoDataUrl === null) &&
    Array.isArray(addresses) &&
    addresses.every(
      (address) =>
        isRecord(address) &&
        typeof address.id === "string" &&
        typeof address.address === "string" &&
        typeof address.area === "string" &&
        typeof address.isDefault === "boolean"
    ) &&
    typeof notifications.orderUpdates === "boolean" &&
    typeof notifications.marketplaceNews === "boolean"
  );
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function initializeAccount() {
  if (hasLoadedAccount || typeof window === "undefined") {
    return;
  }

  hasLoadedAccount = true;
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      snapshot = { ...SERVER_SNAPSHOT, isLoaded: true };
      return;
    }

    const parsed: unknown = JSON.parse(storedValue);
    if (
      !isRecord(parsed) ||
      parsed.version !== STORAGE_VERSION ||
      !isBuyerAccountData(parsed.account)
    ) {
      snapshot = {
        ...SERVER_SNAPSHOT,
        isLoaded: true,
        storageMessage:
          "Saved account details could not be read. Default details are shown.",
      };
      return;
    }

    snapshot = {
      account: parsed.account,
      isLoaded: true,
      storageMessage: "",
    };
  } catch {
    snapshot = {
      ...SERVER_SNAPSHOT,
      isLoaded: true,
      storageMessage:
        "Saved account details could not be read. Default details are shown.",
    };
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

export function getBuyerInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "AB"
  );
}

export function BuyerAccountProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { account, isLoaded, storageMessage } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    initializeAccount();
    notifyListeners();
  }, []);

  function updateAccount(nextAccount: BuyerAccountData) {
    initializeAccount();
    snapshot = { ...snapshot, account: nextAccount };
    notifyListeners();
  }

  function saveAccount(nextAccount: BuyerAccountData) {
    initializeAccount();
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: STORAGE_VERSION, account: nextAccount })
      );
      snapshot = {
        account: nextAccount,
        isLoaded: true,
        storageMessage: "Account changes saved in this browser.",
      };
      notifyListeners();
      return true;
    } catch {
      snapshot = {
        account: nextAccount,
        isLoaded: true,
        storageMessage:
          "Changes are active for this session but could not be saved in this browser.",
      };
      notifyListeners();
      return false;
    }
  }

  return (
    <BuyerAccountContext.Provider
      value={{
        account,
        isLoaded,
        storageMessage,
        updateAccount,
        saveAccount,
      }}
    >
      {children}
    </BuyerAccountContext.Provider>
  );
}

export function useBuyerAccount() {
  const context = useContext(BuyerAccountContext);
  if (!context) {
    throw new Error("useBuyerAccount must be used within BuyerAccountProvider.");
  }

  return context;
}
