"use client";
import { cn } from "../../lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Home, MessageSquare, User, Settings, LogOut, Trash2 } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const SidebarContext = createContext(undefined);
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}) => {
    const [openState, setOpenState] = useState(false);
    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;
    return (
        <SidebarContext.Provider value={{ open, setOpen, animate }}>
            {children}
        </SidebarContext.Provider>
    );
};
export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};
export const SidebarBody = (props) => {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...props} />
        </>
    );
};
export const DesktopSidebar = ({
    className,
    children,
    ...props
}) => {
    const { open, setOpen, animate } = useSidebar();
    return (
        <motion.div
            className={cn(
                "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0",
                className
            )}
            animate={{
                width: animate ? (open ? "300px" : "60px") : "300px",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            {...props}
        >
            {children}
        </motion.div>
    );
};
export const MobileSidebar = ({
    className,
    children,
    ...props
}) => {
    const { open, setOpen } = useSidebar();
    return (
        <>
            <div
                className={cn(
                    "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
                )}
                {...props}
            >
                <div className="flex justify-end z-20 w-full">
                    <Menu
                        className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className={cn(
                                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-100 flex flex-col justify-between",
                                className
                            )}
                        >
                            <div
                                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                                onClick={() => setOpen(!open)}
                            >
                                <X />
                            </div>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
export const SidebarLink = ({
    link,
    className,
    ...props
}) => {
    const { open, animate } = useSidebar();
    return (
        <a
            href={link.href}
            className={cn(
                "flex items-center justify-start gap-2 group/sidebar py-2",
                link.label === "Clear Chat" && "text-red-600 dark:text-red-400",
                className
            )}
            onClick={link.onClick}
            {...props}
        >
            {link.icon}
            <motion.span
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className={cn(
                    "text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block p-0! m-0!",
                    link.label === "Clear Chat" && "text-red-600 dark:text-red-400"
                )}
            >
                {link.label}
            </motion.span>
        </a>
    );
};
export default function FullSidebar({ onClearChat }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { logout } = useAuth()
    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await logout()
            navigate('/')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }
    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />,
        },
        {
            label: "Chat",
            href: "#",
            icon: <MessageSquare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />,
        },
        {
            label: "Profile",
            href: "#",
            icon: <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />,
        },
        {
            label: "Clear Chat",
            href: "#",
            icon: <Trash2 className="text-red-600 dark:text-red-400 h-5 w-5 shrink-0" />,
            onClick: (e) => {
                e.preventDefault()
                if (onClearChat) {
                    onClearChat()
                }
            }
        },
        {
            label: "Logout",
            href: "#",
            icon: <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 shrink-0" />,
            onClick: handleLogout
        },
    ];
    return (
        <div className="flex h-screen w-full">
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Apex AI",
                                href: "#",
                                icon: <span className="text-xl">🤖</span>,
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    )
}