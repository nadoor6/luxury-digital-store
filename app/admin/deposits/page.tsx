// app/admin/deposits/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCheck, FaTimes, FaMoneyBillWave, FaTelegram, FaEye, FaHistory } from 'react-icons/fa';

export default function AdminDepositsManagement() {
  const { 
    isAdmin, 
    getDepositRequests, 
    approveDeposit, 
    rejectDeposit,
    getAllUsers
  } = useWallet();
  const [deposits, setDeposits] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
  const [adminNote, setAdminNote] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      setDeposits(getDepositRequests());
    }
  }, [isAdmin, getDepositRequests]);

  if (!isAdmin) {
    router.push('/admin/access');
    return null;
  }

  const filteredDeposits = deposits.filter(deposit => 
    filter === 'all' ? true : deposit.status === filter
  );

  const handleApprove = async (depositId: string) => {
    try {
      await approveDeposit(depositId, adminNote);
      setDeposits(getDepositRequests());
      setSelectedDeposit(null);
      setAdminNote('');
      alert('Deposit approved successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleReject = async (depositId: string) => {
    if (!adminNote) {
      alert('Please provide a reason for rejection');
      return;
    }

    try {
      await rejectDeposit(depositId, adminNote);
      setDeposits(getDepositRequests());
      setSelectedDeposit(null);
      setAdminNote('');
      alert('Deposit rejected successfully!');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'approved': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer': return '🏦';
      case 'crypto': return '₿';
      case 'paypal': return '💳';
      case 'western_union': return '💸';
      default: return '💰';
    }
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass rounded-2xl p-8 border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/dashboard" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 magnetic-btn">
              <FaArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white brand-ugarit">DEPOSIT REQUESTS MANAGEMENT</h1>
              <p className="text-white/60 font-helvetica">Manual deposit approval system</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaMoneyBillWave className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Pending</p>
              <p className="text-2xl font-black text-white">
                {deposits.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Approved</p>
              <p className="text-2xl font-black text-white">
                {deposits.filter(d => d.status === 'approved').length}
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaTimes className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Rejected</p>
              <p className="text-2xl font-black text-white">
                {deposits.filter(d => d.status === 'rejected').length}
              </p>
            </div>
            <div className="liquid-glass rounded-xl p-4 text-center border border-white/10">
              <FaHistory className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-helvetica-bold">Total</p>
              <p className="text-2xl font-black text-white">{deposits.length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { value: 'pending', label: 'Pending', count: deposits.filter(d => d.status === 'pending').length },
              { value: 'approved', label: 'Approved', count: deposits.filter(d => d.status === 'approved').length },
              { value: 'rejected', label: 'Rejected', count: deposits.filter(d => d.status === 'rejected').length },
              { value: 'all', label: 'All', count: deposits.length }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value as any)}
                className={`px-4 py-2 rounded-xl font-helvetica-bold whitespace-nowrap transition-all duration-300 ${
                  filter === filterOption.value
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>

          {/* Deposits List */}
          <div className="space-y-4">
            {filteredDeposits.length === 0 ? (
              <div className="text-center py-12">
                <FaMoneyBillWave className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 font-helvetica-bold">No deposits found</p>
                <p className="text-white/40 font-helvetica mt-2">
                  {filter === 'pending' ? 'No pending deposits requiring action' : `No ${filter} deposits`}
                </p>
              </div>
            ) : (
              filteredDeposits.map((deposit) => (
                <div
                  key={deposit.id}
                  className="liquid-glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">
                        {getMethodIcon(deposit.paymentMethod)}
                      </div>
                      <div>
                        <p className="text-white font-helvetica-bold">
                          ${deposit.amount} • {deposit.paymentMethod.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-white/60 font-helvetica text-sm">
                          Wallet: {deposit.walletAddress}
                        </p>
                        <p className="text-white/40 font-helvetica text-sm">
                          {new Date(deposit.createdAt).toLocaleString()}
                        </p>
                        {deposit.telegramContact && (
                          <p className="text-white/40 font-helvetica text-sm flex items-center gap-1">
                            <FaTelegram className="w-3 h-3" />
                            {deposit.telegramContact}
                          </p>
                        )}
                        {deposit.adminNote && (
                          <p className="text-white/40 font-helvetica text-sm">
                            Note: {deposit.adminNote}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-helvetica-bold border ${getStatusColor(deposit.status)}`}>
                        {deposit.status.toUpperCase()}
                      </span>

                      {deposit.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedDeposit(deposit)}
                            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                            title="Review"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Proof Image */}
                  {deposit.proofImage && (
                    <div className="mt-4">
                      <p className="text-white/60 font-helvetica text-sm mb-2">Payment Proof:</p>
                      <img 
                        src={deposit.proofImage} 
                        alt="Payment proof" 
                        className="max-w-xs rounded-lg border border-white/10 cursor-pointer"
                        onClick={() => window.open(deposit.proofImage, '_blank')}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Approval Modal */}
        {selectedDeposit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="liquid-glass rounded-2xl p-6 border border-white/10 max-w-md w-full"
            >
              <h3 className="text-xl font-black text-white brand-ugarit mb-4">
                PROCESS DEPOSIT
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/60">Amount:</span>
                  <span className="text-white font-helvetica-bold">${selectedDeposit.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Wallet:</span>
                  <span className="text-white font-helvetica-bold text-sm">
                    {selectedDeposit.walletAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Method:</span>
                  <span className="text-white font-helvetica-bold">
                    {selectedDeposit.paymentMethod}
                  </span>
                </div>
                {selectedDeposit.telegramContact && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Telegram:</span>
                    <span className="text-white font-helvetica-bold">
                      {selectedDeposit.telegramContact}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-white font-helvetica-bold mb-2">
                  ADMIN NOTE
                </label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent font-helvetica resize-none"
                  placeholder="Add note about this deposit..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleReject(selectedDeposit.id)}
                  disabled={!adminNote}
                  className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors font-helvetica-bold disabled:opacity-50"
                >
                  REJECT
                </button>
                <button
                  onClick={() => handleApprove(selectedDeposit.id)}
                  className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors font-helvetica-bold"
                >
                  APPROVE
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedDeposit(null);
                  setAdminNote('');
                }}
                className="w-full mt-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors font-helvetica-bold"
              >
                CANCEL
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}